import React from "react";
import styles from "./CartBasketItem.module.scss";
import { CartOrderItemInterface } from "@/features/Cart/interface";
import Image from "next/image";
import { CartWearImg, MinusSvg, PlusSvg } from "$/assets/images";
import { Button } from "antd";
import { Checkbox } from "@/ui";
import { useTranslations } from "next-intl";

interface Props {
  item: CartOrderItemInterface;
  setAddOrder: React.Dispatch<React.SetStateAction<CartOrderItemInterface | null>>,
}

export default function CartBasketItem({ item, setAddOrder }: Props) {
  const t = useTranslations('GLOBAL');

  const handleChange = () => {
    setAddOrder(item)
  }


  return (
    <div className={styles.main}>
      <div className={styles.item_img}>
        {item.image_url ?
          <Image fill alt="#" src={item.image_url} /> :
          "null :("
        }
      </div>

      <div className={styles.item_text}>
        <div className={styles.item_info}>
          <p>{item.title}</p>
          <span>
            {item.color || "null :("} · {item.size || "null :("}
          </span>
        </div>

        <h3>{item.price} {t('currency')}</h3>
      </div>

      <div className={styles.checkbox_block}>
        <div className={styles.Checkbox}>
          <Checkbox onChange={handleChange} />
        </div>
      </div>

      <div className={styles.change_value}>
        <Button>
          <Image src={MinusSvg} width={24} height={24} alt="#" />
        </Button>
        <h4>{item.quantity}</h4>
        <Button>
          <Image src={PlusSvg} width={24} height={24} alt="#" />
        </Button>
      </div>
    </div>
  );
}
