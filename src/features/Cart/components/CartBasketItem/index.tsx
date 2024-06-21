import React from "react";
import styles from "./CartBasketItem.module.scss";
import { CartOrderItemInterface } from "@/features/Cart/interface";
import Image from "next/image";
import { MinusSvg, PlusSvg } from "$/assets/images";
import { Button } from "antd";
import { Checkbox } from "@/ui";
import { useTranslations } from "next-intl";

interface Props {
  item: CartOrderItemInterface;
}

export default function CartBasketItem({ item }: Props) {
  const t = useTranslations('GLOBAL')
  return (
    <div className={styles.main}>
      <div className={styles.item_img}>
        <Image fill alt="#" src={item.image} />
      </div>

      <div className={styles.item_text}>
        <div className={styles.item_info}>
          <p>{item.title}</p>
          <span>
            {item.color} · {item.size}
          </span>
        </div>

        <h3>{item.cost} {t('currency')}</h3>
      </div>

      <div className={styles.checkbox_block}>
        <div className={styles.Checkbox}>
          <Checkbox />
        </div>
      </div>

      <div className={styles.change_value}>
        <Button>
          <Image src={MinusSvg} width={24} height={24} alt="#" />
        </Button>
        <h4>{item.count}</h4>
        <Button>
          <Image src={PlusSvg} width={24} height={24} alt="#" />
        </Button>
      </div>
    </div>
  );
}
