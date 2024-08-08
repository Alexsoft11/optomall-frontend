import React, { useEffect, useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button, message, Tooltip } from "antd";
import { MinusSvg, PlusSvg } from "$/assets/images";
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
}

const ProductOrderSection: React.FC<Props> = ({
  product,
  selectedColor,
  sizes,
  skus,
  colors,
  setColorsBasket,
  colorsBasket,
}) => {
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [basketData, setBasketData] = useState<BasketInterface[]>([]);
  const user = useJwt();
  const { appendData: createData } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      setLoading(false);
      // resetStates();
    },
  });

  useEffect(() => {
    if (!!colorsBasket.length && selectedColor) {
      for (let i = 0; i < colorsBasket.length; i++) {
        const element = colorsBasket[i];
        if (selectedColor.value === element.color) {
          setBasketData(element.data);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  const updateColorBasket = (updatedBasket: BasketInterface[]) => {
    const newColorsBasket = colorsBasket.map((colorBasket) => {
      if (colorBasket.color === selectedColor?.value) {
        return { color: selectedColor?.value, data: updatedBasket };
      }
      return colorBasket;
    });
    setColorsBasket(newColorsBasket);
  };
  console.log(colorsBasket);

  const handleSizeChange = (
    type: "incr" | "decr",
    sizeProperty?: SKUProperty
  ) => {
    const selectedSKU = skus?.find(
      (sku) =>
        sku.properties.some((prop) => prop.value === selectedColor?.value) &&
        sku.properties.some((prop) => prop.value === sizeProperty?.value)
    );
    if (!selectedSKU) {
      return;
    }
    if (type === "incr") {
      setTotalPrice(totalPrice + selectedSKU?.price);
      if (basketData?.some((prop) => prop.sku_id === selectedSKU?.sku_id)) {
        const newBasketData = basketData.map((data) => {
          if (data.sku_id === selectedSKU?.sku_id) {
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
          max_quantity: selectedSKU?.quantity,
          price: selectedSKU?.price,
          product_id: product?.id,
          product_url: product?.product_url,
          provider: query.provider,
          quantity: 1,
          seller_id: product?.seller_info
            ? product?.seller_info.user_num_id
            : "default",
          size: sizeProperty?.value,
          sku_id: selectedSKU?.sku_id,
          title: product?.title,
        };
        const newBasketData = [...basketData, newBasketItem];
        setBasketData(newBasketData);
        updateColorBasket(newBasketData);
      }
    }

    if (type === "decr") {
      if (basketData?.some((prop) => prop.sku_id === selectedSKU?.sku_id)) {
        setTotalPrice(totalPrice - selectedSKU?.price);
        const newBasketData = basketData
          .map((data) => {
            if (data.sku_id === selectedSKU?.sku_id) {
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

  const onFinish = () => {};

  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>
          {formatPrice(product?.price)} uzs
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

      <div className={`${styles.sizeSelector}`}>
        {sizes.map((size, idx) => {
          const { value } = size;
          const quantity = basketData?.find((data) => data.size === value);
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
                <Button onClick={() => handleSizeChange("decr", size)}>
                  <Image src={MinusSvg} width={24} height={24} alt="#" />
                </Button>
                <h4 className={styles.selected_quantity}>
                  {quantity ? quantity.quantity : 0}
                </h4>
                <Button onClick={() => handleSizeChange("incr", size)}>
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </Button>
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
        <Button
          loading={loading}
          className={styles.addToCart}
          onClick={onFinish}
          // disabled={!isProductSelected()}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductOrderSection;
