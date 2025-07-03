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
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";

interface Props {
  orderData: OrderDataInterface;
  userData: UserDataInterface;
}

export default function OrderPage({ orderData, userData }: Props) {
  const [finished1688Count, setFinished1688Count] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const t = useTranslations("Order");
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

  useEffect(() => {
    if (!orderData?.detail?.length) return;

    const count = orderData.detail.filter(
      (order) => order.items[0]?.provider === "1688"
    ).length;

    console.log(
      !!orderData.order.delivery_china &&
        !Number(orderData.order.delivery_china)
    );

    if (
      count &&
      !!orderData.order.delivery_china &&
      !Number(orderData.order.delivery_china)
    ) {
      setIsLoading(true);
    }
    setDeliveryPrice(Math.round(orderData.order.delivery_china || 0));
    setFinished1688Count(0);
  }, [orderData]);

  const handleDeliveryFeeFinished = (total?: number) => {
    const count = orderData.detail.filter(
      (order) => order.items[0]?.provider === "1688"
    ).length;
    setFinished1688Count((prev) => {
      const next = prev + 1;
      if (next === count) {
        onAllDeliveryFeesFinished(total);
      }
      return next;
    });
  };

  const onAllDeliveryFeesFinished = (total?: number) => {
    setIsLoading(false);
    if (!!total && total > deliveryPrice) {
      setDeliveryPrice(Math.round(total));
    }
  };

  return (
    <div className={styles.main}>
      {isLoading && (
        <div className={styles.loadingTip}>
          <LoadingSpinner />
          <div className={styles.loadingMessage}>
            <p>{t("calculatingChinaDelivery")}</p>
            <p>{t("calculationMayTakeTime")}</p>
          </div>
        </div>
      )}
      <div className={styles.check}>
        <OrderCheque
          cardName={orderData?.order?.name}
          costPerKg={orderData?.order?.kg_price}
          cardId={orderData?.order?.card_number}
          cost={Math.round(orderData?.order?.total_price) + deliveryPrice}
          delivery_china={deliveryPrice}
          product_cost={Math.round(orderData?.order?.total_price)}
        />
      </div>
      <div className={styles.items_block}>
        <div className={styles.items}>
          {orderData?.detail?.map((el) => (
            <Fragment key={el.id}>
              <PurchasesItem
                item={el}
                isOrderPage={
                  !!orderData.order.delivery_china &&
                  !Number(orderData.order.delivery_china)
                }
                onDeliveryFeeFinished={handleDeliveryFeeFinished}
              />
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
          product_cost={Math.round(orderData?.order?.total_price)}
          delivery_china={deliveryPrice}
          cost={Math.round(orderData?.order?.total_price) + deliveryPrice}
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
