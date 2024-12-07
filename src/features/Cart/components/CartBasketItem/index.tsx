/*************  ✨ Codeium Command 🌟  *************/
/**
 * CartBasketItem component
 * @param {Props} props - Component props
 * @returns {ReactElement} - React component
 */
import React, { Fragment, useRef, useState } from "react";
import styles from "./CartBasketItem.module.scss";
import {
  AddOrderInterface,
  CartItemInterface,
  CartOrderItemInterface,
} from "@/features/Cart/interface";
import Image from "next/image";
import { MinusSvg, PlusSvg } from "$/assets/images";
import { Button, Tooltip } from "antd";
import { Checkbox } from "@/ui";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/constants";
import { useRouter } from "next/router";
import SvgSelector from "$/assets/icons/SvgSelector";

interface Props {
  item: CartItemInterface;
  setAddOrder: React.Dispatch<
    React.SetStateAction<AddOrderInterface | AddOrderInterface[] | null>
  >;
  changeQuantity: (number: number, item: CartItemInterface) => void;
}

export default function CartBasketItem({
  changeQuantity,
  item,
  setAddOrder,
}: Props) {
  const t = useTranslations("");
  const router = useRouter();

  const [showAll, setShowAll] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (pixels: number = 100): void => {
    window.scrollTo({
      top: window.scrollY - pixels,
      behavior: "smooth",
    });
  };

  const handleToggleShowAll = () => {
    if (showAll && divRef?.current) {
      const height = divRef.current.offsetHeight;
      scrollToTop(height - 50);
    }
    setShowAll(!showAll);
  };

  /**
   * Handles checkbox changes
   * @param {boolean} chacked - Checkbox state
   */
  const handleChange = (chacked: boolean) => {
    if (!item.sku_id) return;
    const data: CartOrderItemInterface = {
      id: item.id,
      product_id: item.product_id,
      image_url: item.image_url,
      product_url: item.product_url,
      title: item.title,
      provider: item.provider,
      seller_id: item.seller_id,
      sku_id: item.sku_id,
      price: +item.price,
      properties: item.properties,
      quantity: item.quantity,
    };

    setAddOrder({ item: data, chacked: chacked });
  };
  /**
   * Handles product page navigation
   */
  const handleNavigate = () => {
    let url = `/${router.locale}/product/${item.product_id}?provider=${
      item.provider || "1688"
    }`;
    router.push(url);
  };

  return (
    <div className={styles.main}>
      <div className={styles.item_img}>
        {item.image_url ? <Image fill alt="#" src={item.image_url} /> : null}
      </div>

      <div className={styles.item_text}>
        <div className={styles.item_info} onClick={handleNavigate}>
          <p>{item.title}</p>
        </div>

        <h3>
          {formatPrice(item.price)} {t("GLOBAL.currency")}
        </h3>
      </div>

      <div className={styles.color_block}>
        {(showAll ? item?.properties : item?.properties?.slice(0, 1))?.map(
          (el, idx) => (
            <Fragment key={idx}>
              <div className={styles.detail}>
                <span className={styles.detail_category}>{el.name}</span>
                <p className={styles.detail_value}>{el.value}</p>
              </div>
            </Fragment>
          )
        )}
        {item?.properties && item?.properties?.length > 1 && (
          <button
            onClick={handleToggleShowAll}
            className={styles.showAllButton}
          >
            {showAll
              ? t("Product-detail.hide")
              : t("Product-detail.allSpecificationsAndDescription")}
          </button>
        )}
      </div>

      <Tooltip
        trigger={"click"}
        title={item?.properties.map((el) => el.value).join("/ ")}
      >
        <div className={styles.characteristics_mobile}>
          <div className={styles.characteristics}>
            {item?.properties?.map((el, idx) => (
              <Fragment key={idx}>
                <span>{el.value}/</span>
              </Fragment>
            ))}
          </div>
          <div className={styles.arrow}>
            <SvgSelector id={"chevron-svg"} />
          </div>
        </div>
      </Tooltip>

      <div className={styles.checkbox_block}>
        <div className={styles.Checkbox}>
          <Checkbox
            checked={item.chacked}
            onChange={(e) => handleChange(e.target.checked)}
            initialValue={false}
          />
        </div>
      </div>

      <div className={styles.change_value}>
        <Button onClick={() => changeQuantity(--item.quantity, item)}>
          <Image src={MinusSvg} width={24} height={24} alt="#" />
        </Button>
        <h4>{item.quantity}</h4>
        <Button onClick={() => changeQuantity(++item.quantity, item)}>
          <Image src={PlusSvg} width={24} height={24} alt="#" />
        </Button>
      </div>
    </div>
  );
}
