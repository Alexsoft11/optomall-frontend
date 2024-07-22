import React from "react";
import styles from "./CartBasketItem.module.scss";
import { CartItemInterface, CartOrderItemInterface } from "@/features/Cart/interface";
import Image from "next/image";
import { MinusSvg, PlusSvg } from "$/assets/images";
import { Button } from "antd";
import { Checkbox } from "@/ui";
import { useLocale, useTranslations } from "next-intl";
import { LanguageStringIntergace } from "@/interfaces";

interface Props {
  item: CartItemInterface;
  setAddOrder: React.Dispatch<
    React.SetStateAction<{
      item: CartOrderItemInterface;
      chacked: boolean;
    } | null>
  >;
  changeQuantity: (number: number, item: CartItemInterface) => void
}

export default function CartBasketItem({ changeQuantity, item, setAddOrder }: Props) {
  const t = useTranslations("GLOBAL");
  const locale = useLocale()

  const handleChange = (chacked: boolean) => {

    if (!item.size_id) return
    const data: CartOrderItemInterface = {
      product_id: item.product_id,
      image_url: item.image_url,
      title: item.title[locale as keyof LanguageStringIntergace],
      color: item.color,
      size: item.size,
      size_id: item.size_id,
      price: +item.price,
      quantity: item.quantity,
    }


    setAddOrder({ item: data, chacked: chacked });
  };

  return (
    <div className={styles.main}>
      <div className={styles.item_img}>
        {item.image_url ? (
          <Image fill alt="#" src={item.image_url} />
        ) : null}
      </div>


      <div className={styles.item_text}>
        <div className={styles.item_info}>
          <p>{item.title[locale as keyof LanguageStringIntergace]}</p>
          <span>
            {item.color} · {item.size}
          </span>
        </div>

        <h3>
          {item.price} {t("currency")}
        </h3>
      </div>

      <div className={styles.checkbox_block}>
        <div className={styles.Checkbox}>
          <Checkbox onChange={(e) => handleChange(e.target.checked)} initialValue={false} />
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
