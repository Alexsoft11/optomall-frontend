import React, { useEffect, useState } from "react";
import styles from "./CartBasketPage.module.scss";
import CartBasketItems from "../CartBasketItems";
import CartOrderBlock from "../CartOrderBlock";
import { CartOrderItemInterface } from "../../interface";
import CartGetOrderLocations from "../CartGetOrderLocations";
import CartGetOrderPerson from "../CartGetOtderPerson";

interface Props {
  data: CartOrderItemInterface[]
}


export default function CartBasketPage({ data }: Props) {
  const [orderItems, setOrderItems] = useState<CartOrderItemInterface[]>([])
  const [addOrder, setAddOrder] = useState<{ item: CartOrderItemInterface, chacked: boolean } | null>(null)
  const [location, setLocation] = useState<number[] | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [personData, setPersonData] = useState<any>(null);


  const getTotlaPrice = () => {
    let total = 0;
    if (orderItems.length) {
      total = +orderItems.reduce((acum, current) => acum + +current.price, total).toFixed(2)
    }
    return total
  }

  useEffect(() => {
    const copy = Object.assign(orderItems, [])
    if (!addOrder?.chacked && addOrder?.item) {
      copy.splice(copy.indexOf(addOrder.item), 1)
    }
    if (addOrder?.chacked && addOrder !== null) copy.push(addOrder.item)

    setOrderItems(copy)
    setAddOrder(null)
  }, [addOrder])

  return (
    <div className={styles.main}>
      <CartBasketItems setAddOrder={setAddOrder} data={data} />
      <div className={styles.order_side}>
        <CartOrderBlock itemValue={orderItems.length} country={country} items={orderItems} location={location} personData={personData} cost={getTotlaPrice()} />
        <div className={styles.order_info}>
          <CartGetOrderLocations setCountry={setCountry} setLocation={setLocation} />
          <CartGetOrderPerson setPersonData={setPersonData} />
        </div>
      </div>
    </div>
  );
}
