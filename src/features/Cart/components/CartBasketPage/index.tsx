import React, { useEffect, useState } from "react";
import styles from "./CartBasketPage.module.scss";
import CartBasketItems from "../CartBasketItems";
import OrderBlock from "../../../../components/OrderBlock";
import {
  AddOrderInterface,
  CartItemInterface,
  CartOrderItemInterface,
  CreateOrderDataInterface,
} from "../../interface";
import Cookies from "universal-cookie";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";
import "animate.css";
import PageNoItems from "@/components/PageNoItems";
import { useTranslations } from "next-intl";

interface Props {
  data: CartItemInterface[];
  isBasketDataLoading: boolean;
}

export default function CartBasketPage({ data, isBasketDataLoading }: Props) {
  
  const [orderItems, setOrderItems] = useState<CartOrderItemInterface[] | []>(
    []
  );
  const [dataClone, setDataClone] = useState<CartItemInterface[]>(data);
  const t = useTranslations("Cart");

  const [selectAll, setSelectAll] = useState(false);

  const [addOrder, setAddOrder] = useState<
    AddOrderInterface | AddOrderInterface[] | null
  >(null);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [itemsValue, setItemsValue] = useState<number>(0);

  const cookie = new Cookies();

  useEffect(() => {
    if (data) {
      setDataClone(data);
    }
  }, [data]);

  useEffect(() => {
    setOrderItems([]);
    setSelectAll(false);
  }, [dataClone.length]);

  const createOrderData: CreateOrderDataInterface = {
    total_price: totalPrice,
    items: orderItems,
  };

  useEffect(() => {
    let total = 0;
    if (orderItems.length) {
      total = +orderItems
        .reduce(
          (acum, current) => acum + +current.price * +current.quantity,
          total
        )
        .toFixed(2);
    }
    setTotalPrice(total);
    ChangeitemsValue();
  }, [orderItems]);

  
  useEffect(() => {
    if (Array.isArray(addOrder)) {
      let clone = [] as CartOrderItemInterface[] | [];

      if (addOrder[0].chacked) {
        clone = addOrder.map((el) => el.item);
      }

      setOrderItems(clone);
      setAddOrder(null);
      return;
    }

    orderItems.length !== dataClone.length
      ? setSelectAll(false)
      : setSelectAll(true);

    let copy = orderItems.map((el) => el);
    let newDataClone = dataClone.map((el) =>
      el.sku_id === addOrder?.item.sku_id
        ? { ...el, chacked: addOrder?.chacked }
        : { ...el }
    );

    setDataClone(newDataClone);

    if (!addOrder?.chacked && addOrder?.item) {
      copy = copy.filter((el) => {
        if (addOrder.item.sku_id !== el.sku_id) return true;
        else false;
      });
    }
    if (addOrder?.chacked && addOrder !== null) copy.push(addOrder.item);

    setAddOrder(null);
    setOrderItems(copy);
  }, [addOrder]);

  const { appendData: removeData, isLoading } = useQueryApiClient({
    request: {
      url: "remove",
      method: "DELETE",
      disableOnMount: true,
    },
    onSuccess(res) {
      setDataClone(res.original);
    },
  });

  const changeQuantity = (number: number, item: CartItemInterface) => {
    if (number === 0 && cookie.get("token")) {
      removeData({ basket_id: item.id, sku_id: item.sku_id });
    }

    const updatedDataClone = dataClone.map((el) => {
      if (el.sku_id === item.sku_id) {
        return { ...el, quantity: number };
      } else return el;
    });

    const updatedOrderItems = orderItems.map((el) => {
      if (el.sku_id === item.sku_id) {
        return { ...el, quantity: number };
      } else return el;
    });

    setDataClone(updatedDataClone as CartItemInterface[]);
    setOrderItems(updatedOrderItems);
  };

  const ChangeitemsValue = () => {
    let total = 0;
    total = +orderItems.reduce(
      (acum, current) => acum + +current.quantity,
      total
    );

    setItemsValue(total);
  };

  if (isBasketDataLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className={styles.main}>
      {!dataClone.length ? (
        <PageNoItems text={t("goToBuy")} title={t("basketNoItems")} />
      ) : (
        <>
          <CartBasketItems
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            changeQuantity={changeQuantity}
            setAddOrder={setAddOrder}
            setDataClone={setDataClone}
            data={dataClone}
            isLoading={isBasketDataLoading}
          />
          <div className={styles.order_side}>
            <OrderBlock
              type="cart"
              itemValue={itemsValue}
              createOrderData={createOrderData}
              cost={totalPrice}
            />
          </div>
          <LoadingSpinner spinning={isLoading} fullscreen={true} size="large" />
        </>
      )}
    </div>
  );
}
