import React, { useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { SearchSvg } from "$/assets/images";
import { formatPrice } from "@/constants";
import {
  CreateOrderDataInterface,
  ProductDetailInterface,
} from "../../interface";
import { useRouter } from "next/router";
import { Button, Modal } from "@/ui";
import { useTranslations } from "next-intl";
import ProductOrderModal from "../ProductOrderModal";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import { useJwt } from "@/utils/useJwt";

interface Props {
  product?: ProductDetailInterface;
}

const ProductOrderSection: React.FC<Props> = ({ product }) => {
  const { push, asPath } = useRouter();

  const [orderModalType, setOrderModalType] = useState<"to_order" | "to_cart" | null>(null);
  const t = useTranslations();

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
          onClick={() => setOrderModalType("to_order")}
          label={t("Product-detail.buy")}
          iconPosition={"bottom"}
        />
      </div>
      {product && (
        <ProductOrderModal
          product={product}
          type={orderModalType}
          setOrderType={setOrderModalType}
        />
      )}
    </div>
  );
};

export default ProductOrderSection;
