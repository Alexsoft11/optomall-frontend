import React, { Fragment } from "react";
import styles from "./OrderPage.module.scss";
import OrderCheque from "../OrderCheque";
import { CartOrderBlock } from "@/features/Cart";
import { OrderDataInterface } from "../../interfaces";
import PurchasesItem from "@/components/PurchasesItem";

interface Props {
  orderData: OrderDataInterface;
}

export default function OrderPage({ orderData }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.order_data}>
        <OrderCheque
          costPerKg={orderData?.order.kg_price}
          cardId={orderData?.order.card_number}
          cost={orderData?.order.total_price}
        />
        <CartOrderBlock
          orderId={orderData?.order.id}
          type="order"
          cost={orderData?.order.total_price}
        />
      </div>
      <div className={styles.items_block}>
        <div className={styles.items}>
          {orderData.detail?.map((el) => (
            <Fragment key={el.id}>
              <PurchasesItem item={el} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
