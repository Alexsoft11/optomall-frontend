import React, { useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { SearchSvg } from "$/assets/images";
import { formatPrice } from "@/constants";
import { ProductDetailInterface } from "../../interface";
import { useRouter } from "next/router";
import { Button, Modal } from "@/ui";
import { useTranslations } from "next-intl";
import ProductOrderModal from "../ProductOrderModal";

interface Props {
  product?: ProductDetailInterface;
}

const ProductOrderSection: React.FC<Props> = ({ product }) => {
  const { push, asPath } = useRouter();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [orderModalType, setOrderModalType] = useState<
    "to_order" | "to_cart" | null
  >(null);
  const t = useTranslations();

  // const onFinish = () => {
  //   if (!token) {
  //     return setShowAuthModal(true);
  //   }
  //   const allBasketData = colorsBasket.flatMap(
  //     (colorBasket) => colorBasket.data
  //   );
  //   if (allBasketData.length === 0) {
  //     message.warning("No items to add to the basket.");
  //     return;
  //   }

  //   appendData(allBasketData);
  // };

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
      </div>
      <Modal {...modalProps} />
      <ProductOrderModal
        product={product}
        type={orderModalType}
        setOrderType={setOrderModalType}
      />
    </div>
  );
};

export default ProductOrderSection;
