import React, { Fragment, useState } from "react";
import styles from "./OrderPage.module.scss";
import OrderCheque from "../OrderCheque";
import { CartOrderBlock } from "@/features/Cart";
import { OrderDataInterface } from "../../interfaces";
import PurchasesItem from "@/components/PurchasesItem";
import { LocationInfoInterface } from "@/components/Types";
import { PersonalDataInterface } from "@/features/Cart/interface";
import CartGetOrderPerson from "@/features/Cart/components/CartGetOtderPerson";
import LocationBlock from "@/components/LocationBlock";

interface Props {
  orderData: OrderDataInterface;
}

export default function OrderPage({ orderData }: Props) {
  const [locationInfo, setLocationInfo] = useState<LocationInfoInterface>({
    region: "",
    district: "",
  });
  const [dataFailed, setDataFailed] = useState<"personal" | "location" | null>(
    null
  );
  const [personData, setPersonData] = useState<PersonalDataInterface | null>(
    null
  );

  return (
    <div className={styles.main}>
      <div className={styles.order_data}>
        <OrderCheque
          cardName={orderData?.order?.name}
          costPerKg={orderData?.order.kg_price}
          cardId={orderData?.order.card_number}
          cost={orderData?.order.total_price}
        />
        <div className={styles.order_side}>
          <CartOrderBlock
            setDataFailed={setDataFailed}
            orderId={orderData?.order.id}
            type="order"
            cost={orderData?.order.total_price}
          />
          <div className={styles.order_info}>
            <div
              className={`${
                dataFailed === "location"
                  ? "animate__shakeX animate__animated"
                  : null
              }`}
            >
              <LocationBlock
                setLocationInfo={setLocationInfo}
                locationInfo={locationInfo}
              />
            </div>
            <div
              className={`${
                dataFailed === "personal"
                  ? "animate__shakeX animate__animated"
                  : null
              }`}
            >
              <CartGetOrderPerson setPersonData={setPersonData} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.items_block}>
        <div className={styles.items}>
          {orderData?.detail?.map((el) => (
            <Fragment key={el.id}>
              <PurchasesItem item={el} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
