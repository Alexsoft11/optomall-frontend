<<<<<<< HEAD
import React from 'react';
import styles from './OrderPage.module.scss';
import { OrderCheque } from '../..';
import { OrderMockdata } from '@/mockdata/Order';
import { CartOrderBlock } from '@/Features/Cart';
=======
import React from "react";
import styles from "./OrderPage.module.scss";
import { OrderCheque } from "../..";
import { CartOrderBlock } from "@/Features/Cartttt";
import { OrderMockdata } from "@/mockdata/Order";
>>>>>>> d4ac9a61d7fe684066bb18f2a5656c405fc5a0ef

interface Props {
  orderId: string;
}

export default function OrderPage({ orderId }: Props) {
  return (
    <div className={styles.main}>
      <OrderCheque cardId={OrderMockdata.cardId} cost={OrderMockdata.cost} />
      <CartOrderBlock orderId={orderId} cost={OrderMockdata.cost} />
    </div>
  );
}
