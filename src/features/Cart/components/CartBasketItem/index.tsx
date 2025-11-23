import React, { Fragment, useRef, useState } from "react";
import styles from "./CartBasketItem.module.scss";
import { Button, Tooltip } from "antd";
import { Checkbox } from "@/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import SvgSelector from "$/assets/icons/SvgSelector";
import { MinusSvg, PlusSvg } from "$/assets/images";
import CustomImage from "@/components/CustomImage";
import { formatPrice } from "@/constants";
import { CartItemInterface } from "../../interface";

interface Props {
  item: CartItemInterface;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  changeQuantity: (quantity: number, item: CartItemInterface) => void;
}

export default function CartBasketItem({
  item,
  checked,
  onToggle,
  changeQuantity,
}: Props) {
  const t = useTranslations("");
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleToggleShowAll = () => {
    if (showAll && divRef?.current) {
      const height = divRef.current.offsetHeight;
      window.scrollTo({
        top: window.scrollY - (height - 50),
        behavior: "smooth",
      });
    }
    setShowAll(!showAll);
  };

  const handleNavigate = () => {
    const url = `/${router.locale}/product/${item.product_id}?provider=${
      item.provider || "1688"
    }`;
    window.open(url, "_blank");
  };
  const handleIncrease = () => changeQuantity(Number(item.quantity) + 1, item);
  const handleDecrease = () => {
    if (item.quantity > 1) changeQuantity(Number(item.quantity) - 1, item);
  };

  return (
    <div className={styles.main}>
      <div className={styles.checkbox_block}>
        <div className={styles.Checkbox}>
          <Checkbox
            checked={checked}
            onChange={(e) => onToggle(e.target.checked)}
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.item_img}>
          {item.image_url && (
            <CustomImage fill alt={item.title} src={item.image_url} />
          )}
        </div>
        <div className={styles.item_inner}>
          <div className={styles.info_text}>
            <div className={styles.item_text}>
              <div className={styles.item_info} onClick={handleNavigate}>
                <p>{item.title}</p>
              </div>
              <h3>
                {formatPrice(item.price)} {t("GLOBAL.currency")}
              </h3>
            </div>
          </div>

          <div className={styles.item_color}>
            <div className={styles.color_block} ref={divRef}>
              {item?.properties?.map((el, idx) => (
                <Fragment key={idx}>
                  <div className={styles.detail}>
                    <span className={styles.detail_category}>{el.name}</span>
                    <p className={styles.detail_value}>{el.value}</p>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className={styles.change_value}>
              <Button onClick={handleDecrease} disabled={item.quantity <= 1}>
                <Image src={MinusSvg} width={24} height={24} alt="-" />
              </Button>
              <h4>{item.quantity}</h4>
              <Button onClick={handleIncrease}>
                <Image src={PlusSvg} width={24} height={24} alt="+" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
