import React, { useEffect, useState } from "react";
import styles from "./CartBasketPage.module.scss";
import CartBasketItems from "../CartBasketItems";
import CartOrderBlock from "../CartOrderBlock";
import { CartItemInterface, CartOrderItemInterface, CreateOrderDataInterface, PersonalDataInterface } from "../../interface";
import CartGetOrderLocations from "../CartGetOrderLocations";
import CartGetOrderPerson from "../CartGetOtderPerson";
import Cookies from "universal-cookie";

interface Props {
  data: CartItemInterface[]
}


export default function CartBasketPage({ data }: Props) {
  const [orderItems, setOrderItems] = useState<CartOrderItemInterface[]>([])
  const [dataClone, setDataClone] = useState<CartItemInterface[]>(data)

  const [addOrder, setAddOrder] = useState<{ item: CartOrderItemInterface, chacked: boolean } | null>(null)

  const [location, setLocation] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [country, setCountry] = useState<string | null>(null);
  const [personData, setPersonData] = useState<PersonalDataInterface | null>(null);

  const cookie = new Cookies();

  const createOrderData: CreateOrderDataInterface = {
    total_price: totalPrice,
    location: {
      name: country,
      url: location,
    },
    userData: personData,
    items: orderItems,
  }

  useEffect(() => {
    let total = 0;
    if (orderItems.length) {
      total = +orderItems.reduce((acum, current) => acum + (+current.price * current.quantity), total).toFixed(2)
    }
    setTotalPrice(total)
  }, [orderItems])

  useEffect(() => {
    if (!cookie.get('token') && localStorage.getItem("basket-data")) {
      setDataClone(JSON.parse(localStorage.getItem("basket-data")!))
    }
  }, [])

  useEffect(() => {
    const copy = orderItems.map((el => el));

    if (!addOrder?.chacked && addOrder?.item) {
      copy.splice(copy.indexOf(addOrder.item), 1)
    }
    if (addOrder?.chacked && addOrder !== null) copy.push(addOrder.item)

    setAddOrder(null)
    setOrderItems(copy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOrder])

  const changeQuantity = (number: number, item: CartItemInterface) => {
    if (number === 0) return;

    const updatedDataClone = dataClone.map(el => {
      if (el.product_id === item.product_id && el.color_id === item.color_id && el.size_id === item.size_id) {
        return { ...el, quantity: number }
      } else return el
    });

    const updatedOrderItems = orderItems.map(el => {
      if (el.product_id === item.product_id && el.color === item.color && el.size === item.size) {
        return { ...el, quantity: number }
      } else return el
    });

    setDataClone(updatedDataClone as CartItemInterface[]);
    setOrderItems(updatedOrderItems);
  }

  const itemsValue = () => {
    let total = 0
    total = +orderItems.reduce((acum, current) => acum + current.quantity , total)
    return total 
  }

  return (
    <div className={styles.main}>
      <CartBasketItems changeQuantity={changeQuantity} setAddOrder={setAddOrder} data={dataClone} />
      <div className={styles.order_side}>
        <CartOrderBlock itemValue={itemsValue()} createOrderData={createOrderData} cost={totalPrice} />
        <div className={styles.order_info}>
          <CartGetOrderLocations setCountry={setCountry} setLocation={setLocation} />
          <CartGetOrderPerson setPersonData={setPersonData} />
        </div>
      </div>
    </div>
  );
}
