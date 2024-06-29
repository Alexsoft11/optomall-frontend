import React, { useEffect, useState } from "react";
import styles from "./CartBasketPage.module.scss";
import { CartOrderMockdata } from "@/mockdata/Cart";
import CartBasketItems from "../CartBasketItems";
import CartOrderBlock from "../CartOrderBlock";
import CartGetOrder from "../CartGetOrder";
import { CartOrderDataInterface, CartOrderItemInterface } from "../../interface";

interface Props {
  data: CartOrderDataInterface
}


export default function CartBasketPage({data}:Props) {
  const [orderItems, setOrderItems] = useState<CartOrderItemInterface[]>([])  
  const [addOrder, setAddOrder] = useState<CartOrderItemInterface | null>(null)  

  useEffect(() => {
    let findFlag = false
    const copy = Object.assign(orderItems, [])
    copy.forEach((el, idx) =>  {
      if (el.id === addOrder?.id) {
        findFlag = true
        copy.splice(idx, 1)
      } else return
    })
    if (!findFlag && addOrder !== null) copy.push(addOrder)

    setOrderItems(copy)
    setAddOrder(null)
  }, [addOrder])
  
  return (
    <div className={styles.main}>
      <CartBasketItems setAddOrder={setAddOrder} data={data} />
      <div className={styles.order_side}>
        <CartOrderBlock itemValue={CartOrderMockdata.itemsValue} cost={CartOrderMockdata.count} />
        <CartGetOrder />
      </div>
    </div>
  );
}
