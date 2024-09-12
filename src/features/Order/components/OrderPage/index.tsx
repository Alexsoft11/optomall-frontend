import React, { Fragment, useEffect, useState } from "react";
import styles from "./OrderPage.module.scss";
import OrderCheque from "../OrderCheque";
import {
  EditOrderInterface,
  OrderDataInterface,
  PersonalDataInterface,
  UserDataInterface,
} from "../../interfaces";
import PurchasesItem from "@/components/PurchasesItem";
import { LocationInfoInterface } from "@/components/Types";
import GetOtderPerson from "@/components/GetOtderPerson";
import LocationBlock from "@/components/LocationBlock";
import OrderBlock from "@/components/OrderBlock";

interface Props {
  orderData: OrderDataInterface;
  userData: UserDataInterface;
}

export default function OrderPage({ orderData, userData }: Props) {
  const locationInitialValue: LocationInfoInterface = {
    region: userData.region || "",
    district: userData.district || "",
  };

  const personalInitialValue: PersonalDataInterface = {
    name: userData.name || "",
    phone: userData.phone || "",
  };
  const [locationInfo, setLocationInfo] =
    useState<LocationInfoInterface>(locationInitialValue);

  const [dataFailed, setDataFailed] = useState<"personal" | "location" | null>(
    null
  );
  const [personData, setPersonData] =
    useState<PersonalDataInterface>(personalInitialValue);

  const editOrderData: EditOrderInterface = {
    order_id: orderData?.order?.id,
    region: locationInfo.region,
    district: locationInfo.district,
    name: personData?.name || "",
    phone: personData?.phone || "",
  };

  return (
    <div className={styles.main}>
      <div className={styles.check}>
        <OrderCheque
          cardName={orderData?.order?.name}
          costPerKg={orderData?.order?.kg_price}
          cardId={orderData?.order?.card_number}
          cost={orderData?.order?.total_price}
        />
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

      <div className={styles.order_side}>
        <OrderBlock
          editOrderData={editOrderData}
          setDataFailed={setDataFailed}
          orderId={orderData?.order?.id}
          type="order"
          cost={orderData?.order?.total_price}
        />
        <div className={styles.order_info}>
          <div
            className={`${dataFailed === "location"
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
            className={`${dataFailed === "personal"
              ? "animate__shakeX animate__animated"
              : null
              }`}
          >
            <GetOtderPerson
              personData={personData}
              setPersonData={setPersonData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
