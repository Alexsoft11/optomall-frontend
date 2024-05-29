import React from "react";
import styles from "./CartBasketItem.module.scss";
import { CartOrderItemInterface } from "@/Features/Cartt/interface";
import Image from "next/image";
import { MinusSvg, PlusSvg } from "$/assets/images";
import { Button } from "antd";
import { Checkbox } from "@/ui";

interface Props {
  item: CartOrderItemInterface;
}

export default function CartBasketItem({ item }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.Checkbox}>
        <Checkbox />
      </div>
      <div className={styles.item_block}>
        <div className={styles.item_info}>
          <div className={styles.item_img}>
            <Image fill alt="#" src={item.image} />
          </div>
          <div className={styles.item_text}>
            <p>{item.title}</p>
            <span>
              {item.color} · {item.size}
            </span>
          </div>
        </div>
        <div className={styles.item_cost}>
          <h3>{item.cost}</h3>
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
      </div>
    </div>
  );
}
