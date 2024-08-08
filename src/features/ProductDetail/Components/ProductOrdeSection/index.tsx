import React, { useEffect, useState, useMemo, useTransition } from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button as AntdButton, message, Tooltip } from "antd";
import { MinusSvg, PlusSvg, SearchSvg } from "$/assets/images";
import Image from "next/image";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useJwt } from "@/utils/useJwt";
import { formatPrice } from "@/constants";
import {
  BasketInterface,
  ColorsBasketInterface,
  ProductDetailInterface,
  SKU,
  SKUProperty,
} from "../../interface";
import { useRouter } from "next/router";
import { Button, Modal } from "@/ui";
import { useTranslations } from "next-intl";

interface Props {
  product?: ProductDetailInterface;
  selectedColor: SKUProperty | undefined;
  sizes: SKUProperty[];
  skus?: SKU[];
  colors?: SKUProperty[];
  setColorsBasket: React.Dispatch<
    React.SetStateAction<ColorsBasketInterface[]>
  >;
  colorsBasket: ColorsBasketInterface[];
  handleResetBasket: () => void;
}

const ProductOrderSection: React.FC<Props> = ({
  product,
  selectedColor,
  sizes,
  skus,
  colors,
  setColorsBasket,
  colorsBasket,
  handleResetBasket,
}) => {
  const { query, push, asPath } = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [basketData, setBasketData] = useState<BasketInterface[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(product?.price || 0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const token = useJwt();
  const t = useTranslations();

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      handleResetBasket();
    },
  });

  useEffect(() => {
    if (!!colorsBasket.length && selectedColor) {
      const basketForSelectedColor = colorsBasket.find(
        (element) => selectedColor.value === element.color
      );
      if (basketForSelectedColor) {
        setBasketData(basketForSelectedColor.data);
      }
    }
  }, [selectedColor, colorsBasket]);

  const updateColorBasket = (updatedBasket: BasketInterface[]) => {
    const newColorsBasket = colorsBasket.map((colorBasket) => {
      if (colorBasket.color === selectedColor?.value) {
        return { color: selectedColor?.value, data: updatedBasket };
      }
      return colorBasket;
    });
    setColorsBasket(newColorsBasket);
  };

  const handleSizeChange = (
    type: "incr" | "decr",
    sizeProperty?: SKUProperty
  ) => {
    const selectedSKU = findSKU(sizeProperty?.value);

    if (!selectedSKU) {
      return;
    }

    if (type === "incr") {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedSKU.price);
      if (basketData.some((prop) => prop.sku_id == selectedSKU.sku_id)) {
        const newBasketData = basketData.map((data) => {
          if (data.sku_id == selectedSKU.sku_id) {
            if (selectedSKU.quantity <= data.quantity) {
              message.warning(
                `max quantity product is ${selectedSKU.quantity}`
              );
              return data;
            }
            const quantity = data.quantity + 1;

            return { ...data, quantity };
          }
          return data;
        });

        setBasketData(newBasketData);
        updateColorBasket(newBasketData);
      } else {
        const newBasketItem: BasketInterface = {
          image_url: selectedColor?.imageUrl
            ? selectedColor?.imageUrl
            : product?.image,
          color: selectedColor?.value,
          max_quantity: selectedSKU.quantity,
          price: selectedSKU.price,
          product_id: String(product?.id),
          product_url: product?.product_url,
          provider: query.channel,
          quantity: 1,
          seller_id: product?.seller_id ? String(product?.seller_id) : "default",
          size: sizeProperty?.value || "default",
          sku_id: String(selectedSKU.sku_id),
          title: product?.title,
        };
        const newBasketData = [...basketData, newBasketItem];
        setBasketData(newBasketData);
        updateColorBasket(newBasketData);
      }
    }

    if (type === "decr") {
      if (basketData.some((prop) => prop.sku_id == selectedSKU.sku_id)) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - selectedSKU.price);
        const newBasketData = basketData
          .map((data) => {
            if (data.sku_id == selectedSKU.sku_id) {
              if (data.quantity === 1) {
                return undefined;
              }
              return { ...data, quantity: data.quantity - 1 };
            }
            return data;
          })
          .filter((data): data is BasketInterface => data !== undefined);

        setBasketData(newBasketData);
        updateColorBasket(newBasketData);
      }
    }
  };

  const findSKU = (size?: string): SKU | undefined => {
    const hasColor = (sku: SKU) =>
      selectedColor
        ? sku.properties.some((prop) => prop.value === selectedColor.value)
        : true;

    const hasSpecificSize = (sku: SKU, size: string) =>
      sku.properties.some((prop) => prop.value === size);

    const hasAnySize = (sku: SKU) =>
      sizes.length > 0
        ? sizes.some((size) =>
            sku.properties.some((prop) => prop.value === size.value)
          )
        : true;

    let selectedSKU =
      size && skus
        ? skus.find((sku) => hasColor(sku) && hasSpecificSize(sku, size))
        : skus && skus.find((sku) => hasColor(sku) && hasAnySize(sku));

    if (!selectedSKU && selectedColor) {
      selectedSKU = skus?.find(hasColor);
    }

    return selectedSKU;
  };

  useEffect(() => {
    const selectedSKU = findSKU();
    if (selectedSKU) {
      setCurrentPrice(selectedSKU.price);
    } else if (product?.price) {
      setCurrentPrice(product.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  const onFinish = () => {
    if (!token) {
      return setShowModal(true);
    }
    const allBasketData = colorsBasket.flatMap(
      (colorBasket) => colorBasket.data
    );
    if (allBasketData.length === 0) {
      message.warning("No items to add to the basket.");
      return;
    }

    appendData(allBasketData);
  };

  const modalProps = {
    onCancel: () => setShowModal(false),
    className: "bg_white",
    img: SearchSvg,
    description: t("Cart.authMessage"),
    children: (
      <Button
        onClick={() => push(`/auth?step=signin&backUrl=${asPath}`)}
        className="signIn_btn"
        label={t("Cart.signin")}
      />
    ),
    open: showModal,
  };

  const displaySizes = useMemo(() => {
    return sizes.length > 0 ? sizes : [{ value: "default" }];
  }, [sizes]);

  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>
          {formatPrice(currentPrice)} uzs
        </span>
        {product?.discounted_price &&
        product.price !== product.discounted_price ? (
          <>
            <span className={styles.discount}>
              -{product.discount_percentage}%
            </span>
            <span className={styles.originalPrice}>
              {formatPrice(product.discounted_price)} uzs
            </span>
          </>
        ) : null}
      </div>

      <div className={styles.sizeSelector}>
        {displaySizes.map((size, idx) => {
          const { value } = size;
          const quantity = basketData?.find((data) => data.size === value);
          const sizeSku = findSKU(value);

          return (
            <div key={idx} className={styles.size}>
              <span
                className={`${value === "default" ? styles.text_hidden : ""}`}
              >
                {value.length > 20 ? (
                  <Tooltip title={value}>{value.slice(0, 16)}...</Tooltip>
                ) : (
                  value
                )}
              </span>
              <div className={styles.change_value}>
                <AntdButton onClick={() => handleSizeChange("decr", size)}>
                  <Image src={MinusSvg} width={24} height={24} alt="#" />
                </AntdButton>
                <Tooltip title={`Max quantity ${sizeSku?.quantity}`}>
                  <h4 className={styles.selected_quantity}>
                    {quantity ? quantity.quantity : 0}
                  </h4>
                </Tooltip>
                <Tooltip>
                  <AntdButton onClick={() => handleSizeChange("incr", size)}>
                    <Image src={PlusSvg} width={24} height={24} alt="#" />
                  </AntdButton>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.add_basket}>
        <div className={styles.total}>
          <p>Итого</p>
          <span className={styles.total_quantity}>
            {formatPrice(totalPrice)} uzs
          </span>
        </div>
        <Tooltip title={token && !totalPrice ? "Please select any item" : ""}>
          <Button
            loading={isLoading}
            className={styles.addToCart}
            onClick={onFinish}
            disabled={token && !totalPrice}
            label={"В корзину"}
          ></Button>
        </Tooltip>
      </div>
      <Modal {...modalProps} />
    </div>
  );
};

export default ProductOrderSection;
