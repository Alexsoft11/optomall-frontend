import React, { useState, useEffect } from "react";
import styles from "./ProductOrderSection.module.scss";
import { formatPrice } from "@/constants";
import {
  CreateBaskettemsDataInterface,
  CreateOrderDataInterface,
  ProductDetailInterface,
  PropsList,
} from "../../interface";
import { Button, Modal } from "@/ui";
import { Button as AntdButton, Tooltip, message } from "antd";
import { useTranslations } from "next-intl";
import ProductOrderModal from "../ProductOrderModal";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import { MinusSvg, PlusSvg, SearchSvg } from "$/assets/images";
import { useJwt } from "@/utils/useJwt";
import Image from "next/image";

interface Props {
  product?: ProductDetailInterface;
}

const ProductOrderSection: React.FC<Props> = ({ product }) => {
  const [orderModalType, setOrderModalType] = useState<
    "to_order" | "to_cart" | null
  >(null);
  const [orderType, setOrderType] = useState<"to_order" | "to_cart">();
  const t = useTranslations();
  const { push, query, asPath } = useRouter();
  const { provider } = query;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [messageDisplayed, setMessageDisplayed] = useState(false);
  const token = useJwt();
  const router = useRouter();

  const toAuth = (path: string) => {
    localStorage.setItem("backUrl", asPath);
    push(path);
  };

  const { appendData: translated, data: translatedData } = useQueryApiClient({
    request: {
      url: "translate",
      method: "POST",
      disableOnMount: false,
    },
  });

  useEffect(() => {
    if (!product || !product.props_list) return;
    const translateData = {
      data: product.props_list,
      from: "auto",
      to: router.locale || "ru",
    };
    translated(translateData);
  }, []);

  const showMessage = () => {
    if (!messageDisplayed) {
      message.warning(t("Product-detail.isMaxQuantity"), 2);
      setMessageDisplayed(true);
      setTimeout(() => {
        setMessageDisplayed(false);
      }, 2000);
    }
  };

  const modalProps = {
    onCancel: () => setShowModal(false),
    className: "bg_white",
    img: SearchSvg,
    description: t("Cart.authMessage"),
    children: (
      <Button
        onClick={() => toAuth(`/auth?step=signin`)}
        className="signIn_btn"
        label={t("Cart.signin")}
      />
    ),
    open: showModal,
  };

  const changeQuantity = (value: number) => {
    if (value < 0) return;
    if (product && value > product.quantity) return showMessage();
    setItemQuantity(value);
  };

  const { appendData: createUserBasket } = useQueryApiClient({
    request: {
      url: orderType === "to_cart" ? `user-basket` : "orders",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Product-detail.${res.message}`), 2);
      res.order_group ? push(`/order/${res.order_group}`) : null;
    },
  });

  const justBuy = (type: "to_order" | "to_cart") => {
    if (!token) return setShowModal(true);
    if (product && product.props_list) {
      return setOrderModalType(type);
    }
    setOrderType(type);
  };

  useEffect(() => {
    if (!orderType || !product) return;

    if (!product.props_list) {
      const { id, title, product_url, image, seller_info, price, quantity } =
        product;

      let item: CreateBaskettemsDataInterface = {
        product_id: id.toString(),
        title: title,
        price: price,
        quantity: itemQuantity,
        image_url: image,
        product_url: product_url,
        seller_id: seller_info?.user_num_id?.toString() || "default" + id,
        provider: provider as string,
        sku_id: id,
        properties: [],
      };

      if (orderType === "to_cart") {
        item.max_quantity = quantity;
        createUserBasket([item]);
      } else if (orderType === "to_order") {
        const data: CreateOrderDataInterface = {
          items: [item],
          total_price: price,
        };
        createUserBasket(data);
      }
    }
  }, [orderType]);

  return (
    <div className={styles.order_section}>
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
        {product && product.skus.length > 1 ? null : (
          <div className={styles.quantity}>
            <div key={1} className={styles.change_value}>
              <AntdButton onClick={() => changeQuantity(itemQuantity - 1)}>
                <Image src={MinusSvg} width={24} height={24} alt="#" />
              </AntdButton>
              <Tooltip title={`Max quantity`}>
                <h4 className={styles.selected_quantity}>{itemQuantity}</h4>
              </Tooltip>
              <Tooltip>
                <AntdButton onClick={() => changeQuantity(itemQuantity + 1)}>
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </AntdButton>
              </Tooltip>
            </div>
          </div>
        )}
        <div className={styles.add_basket}>
          <Button
            className={styles.addToCart}
            onClick={() => justBuy("to_cart")}
            label={t("Product-detail.addToCart")}

            iconPosition={"bottom"}
          />
          <Button
            className={styles.buy}
            onClick={() => justBuy("to_order")}
            label={t("Product-detail.buy")}
            iconPosition={"bottom"}
          />
        </div>
        {product && product.props_list ? (
          <ProductOrderModal
            translatedData={
              translatedData.translated && translatedData?.translated[0]
            }
            product={product}
            type={orderModalType}
            setOrderType={setOrderModalType}
          />
        ) : null}
      </div>
      {product &&
        product?.quantityRanges &&
        product?.quantityRanges?.length > 1 ? (
        <div className={styles.price_range}>
          {product?.quantityRanges?.map((el, index) => {
            const quantityRange = product?.quantityRanges || [];
            const next = quantityRange[index + 1];
            return (
              <div className={styles.item} key={el.minQuantity}>
                <h4>{formatPrice(el.price)} uzs</h4>
                <p>
                  {el.minQuantity} {next && "-"} {next?.minQuantity}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
      <Modal {...modalProps} />
    </div>
  );
};

export default ProductOrderSection;
