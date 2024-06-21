import React, { Fragment } from "react";
import styles from "./CartBasketItems.module.scss";
import { CartMockdata } from "@/mockdata/Cart";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import CartBasketItem from "../CartBasketItem";

export default function CartBasketItems() {
  const t = useTranslations("Cart");

  return (
    <div className={styles.main}>
      <p className={styles.items_count}>
        {t("item")} {CartMockdata.data.length}
      </p>
      <div className={styles.swiper}>
        {CartMockdata.data.map((el) => (
          <Fragment key={el.id}>
            <CartBasketItem item={el} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
