import React, { useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { SearchSvg } from "$/assets/images";
import { formatPrice } from "@/constants";
import {
  CreateBaskettemsDataInterface,
  ProductDetailInterface,
} from "../../interface";
import { useRouter } from "next/router";
import { Button, Modal } from "@/ui";
import { useTranslations } from "next-intl";
import ProductOrderModal from "../ProductOrderModal";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";

interface Props {
  product?: ProductDetailInterface;
}

const ProductOrderSection: React.FC<Props> = ({ product }) => {
  const { push, asPath } = useRouter();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [baskedData, setBasketData] = useState<
    CreateBaskettemsDataInterface[] | []
  >([]);
  const [orderModalType, setOrderModalType] = useState<
    "to_order" | "to_cart" | null
  >(null);
  const t = useTranslations();

  const modalProps = {
    onCancel: () => setShowAuthModal(false),
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
    open: showAuthModal,
  };

  const { appendData: createUserBasket } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
    },
  });

  const toBasket = () => {
    if (!baskedData) return;
    
    createUserBasket(baskedData);
  };
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
      <div className={styles.add_basket}>
        <Button
          className={styles.addToCart}
          onClick={() => setOrderModalType("to_cart")}
          iconId={"shop-svg"}
          iconPosition={"bottom"}
        />
        <Button
          className={styles.buy}
          label={t("Product-detail.buy")}
          onClick={toBasket}
          iconPosition={"bottom"}
        />
      </div>
      <Modal {...modalProps} />
      {product && (
        <ProductOrderModal
          product={product}
          setBasketData={setBasketData}
          type={orderModalType}
          setOrderType={setOrderModalType}
        />
      )}
    </div>
  );
};

export default ProductOrderSection;
