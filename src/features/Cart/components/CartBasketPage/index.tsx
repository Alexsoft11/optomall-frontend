import React, { useEffect, useState } from "react";
import styles from "./CartBasketPage.module.scss";
import CartBasketItems from "../CartBasketItems";
import CartOrderBlock from "../CartOrderBlock";
import { CartItemInterface, CartOrderItemInterface, CreateOrderDataInterface, PersonalDataInterface } from "../../interface";
import CartGetOrderPerson from "../CartGetOtderPerson";
import Cookies from "universal-cookie";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";
import CartBasketNoItems from "../CartBasketNoItems";
import LocationBlock from "@/components/LocationBlock";

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
  const [itemsValue, setItemsValue] = useState<number>(0);

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
    ChangeitemsValue()
  }, [orderItems])

  useEffect(() => {
    if (!cookie.get('token') && localStorage.getItem("basket-data")) {
      setDataClone(JSON.parse(localStorage.getItem("basket-data")!))
    }
  }, [])

  useEffect(() => {
    let copy = orderItems.map((el => el));

    if (!addOrder?.chacked && addOrder?.item) {
      copy = copy.filter(el => {
        if (addOrder.item.size_id !== el.size_id) return true
        else false
      })
    }
    if (addOrder?.chacked && addOrder !== null) copy.push(addOrder.item)

    setAddOrder(null)
    setOrderItems(copy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOrder])

  const { appendData: removeData, isLoading } = useQueryApiClient({
    request: {
      url: "remove",
      method: "DELETE",
      disableOnMount: true,
    },
    onSuccess(res) {
      setDataClone(res.original)
    }
  });


  const changeQuantity = (number: number, item: CartItemInterface) => {
    if (number === 0 && !cookie.get('token')) {
      const updatedDataClone = dataClone.filter(el => el.size_id !== item.size_id)
      const updatedOrderItems = orderItems.filter(el => el.size_id !== item.size_id)

      setDataClone(updatedDataClone);
      setOrderItems(updatedOrderItems);

      localStorage.setItem('basket-data', JSON.stringify(updatedDataClone))
      return
    } else if (number === 0 && cookie.get('token')) {
      removeData({ basket_id: item.id, size_id: item.size_id })
    }

    const updatedDataClone = dataClone.map(el => {
      if (el.size_id === item.size_id) {
        return { ...el, quantity: number }
      } else return el
    });

    const updatedOrderItems = orderItems.map(el => {
      if (el.size_id === item.size_id) {
        return { ...el, quantity: number }
      } else return el
    });

    setDataClone(updatedDataClone as CartItemInterface[]);
    setOrderItems(updatedOrderItems);
  }

  const ChangeitemsValue = () => {
    let total = 0
    total = +orderItems.reduce((acum, current) => acum + current.quantity, total);

    setItemsValue(total)
  }

  return (
    <div className={styles.main}>

      {!dataClone.length ? <CartBasketNoItems /> : (
        <>
          <CartBasketItems changeQuantity={changeQuantity} setAddOrder={setAddOrder} data={dataClone} />
          <div className={styles.order_side}>
            <CartOrderBlock uploadUrl="add-check" itemValue={itemsValue} createOrderData={createOrderData} cost={`${totalPrice} uzs`} />
            <div className={styles.order_info}>
              <LocationBlock setCountry={setCountry} setLocation={setLocation} />
              <CartGetOrderPerson setPersonData={setPersonData} />
            </div>
          </div>
          <LoadingSpinner spinning={isLoading} fullscreen={true} size="large" />
        </>
      )}
    </div>
  );
}
