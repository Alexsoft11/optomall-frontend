import React, { useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { formatPrice } from "@/constants";
import {
  ProductDetailInterface,
} from "../../interface";
import { Button } from "@/ui";
import { useTranslations } from "next-intl";
import ProductOrderModal from "../ProductOrderModal";


interface Props {
  product?: ProductDetailInterface;
}

const ProductOrderSection: React.FC<Props> = ({ product }) => {
  const [orderModalType, setOrderModalType] = useState<"to_order" | "to_cart" | null>(null);
  const t = useTranslations();

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
      <div className={styles.price_range}>
        {product?.quantityRanges.map((el, index) => {
          const next = product?.quantityRanges[index + 1]
          return (
            <div className={styles.item} key={el.minQuantity}>
              <h4>{formatPrice(el.price)} uzs</h4>
              <p>{el.minQuantity} {next && '-'}   {next?.minQuantity}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProductOrderSection;
