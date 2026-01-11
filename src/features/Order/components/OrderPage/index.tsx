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
  const tCart = useTranslations("Cart");

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

  const totalCost = Math.round(orderData?.order?.total_price) + deliveryPrice;
  const productCost = Math.round(orderData?.order?.total_price);

  return (
    <div className={styles.main}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <LoadingSpinner />
            <p>{t("calculatingChinaDelivery")}</p>
            <p>{t("calculationMayTakeTime")}</p>
          </div>
        </div>
      )}

      {/* LEFT COLUMN - Payment Info + Forms (on mobile) */}
      <div className={styles.left_column}>
        {/* Payment Info Card */}
        <OrderCheque
          cardName={orderData?.order?.name}
          costPerKg={orderData?.order?.kg_price}
          cardId={orderData?.order?.card_number}
          cost={totalCost}
          delivery_china={deliveryPrice}
          product_cost={productCost}
        />

        {/* Forms - Show here on mobile */}
        <div className={styles.mobile_forms}>
          {/* Location Form */}
          <div
            className={`${styles.form_section} ${
              dataFailed === "location" ? styles.hasError : ""
            }`}
          >
            <LocationBlock
              setLocationInfo={setLocationInfo}
              locationInfo={locationInfo}
              isShowBorder={false}
            />
          </div>

          {/* Person Form */}
          <div
            className={`${styles.form_section} ${
              dataFailed === "personal" ? styles.hasError : ""
            }`}
          >
            <GetOtderPerson
              personData={personData}
              setPersonData={setPersonData}
            />
          </div>
        </div>

        {/* Ordered Items */}
        <div className={styles.items_section}>
          <h2 className={styles.items_title}>
            {tCart("orderedProducts")}
            <span className={styles.items_count}>{orderData?.detail?.length || 0}</span>
          </h2>
          <div className={styles.items_grid}>
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
      </div>

      {/* RIGHT COLUMN - Sidebar (Desktop only) */}
      <div className={styles.right_column}>
        {/* Order Summary + Upload Button */}
        <OrderBlock
          editOrderData={editOrderData}
          setDataFailed={setDataFailed}
          orderId={orderData?.order?.id}
          type="order"
          product_cost={productCost}
          delivery_china={deliveryPrice}
          cost={totalCost}
        />

        {/* Forms - Desktop only */}
        <div className={styles.desktop_forms}>
          {/* Location Form */}
          <div
            className={`${styles.form_section} ${
              dataFailed === "location" ? styles.hasError : ""
            }`}
          >
            <LocationBlock
              setLocationInfo={setLocationInfo}
              locationInfo={locationInfo}
              isShowBorder={false}
            />
          </div>

          {/* Person Form */}
          <div
            className={`${styles.form_section} ${
              dataFailed === "personal" ? styles.hasError : ""
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
