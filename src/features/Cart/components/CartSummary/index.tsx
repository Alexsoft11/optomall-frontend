import React, { useState } from "react";
import styles from "./CartSummary.module.scss";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/ui";
import { useRouter } from "next/router";
import { CreateOrderDataInterface } from "../../interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import Cookies from "universal-cookie";
import { formatPrice } from "@/constants";
import { LoadingSpinner } from "@/ui/Spin";

interface Props {
  cost: number;
  itemCount: number;
  createOrderData?: CreateOrderDataInterface;
}

export default function CartSummary({
  cost,
  itemCount,
  createOrderData,
}: Props) {
  const t = useTranslations("");
  const [messageVisible, setMessageVisible] = useState(false);
  const router = useRouter();
  const cookie = new Cookies();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "orders",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      setConfirmModalOpen(false);
      router.push(`order/${res.order_group}`);
    },
  });

  const {
    appendData: getDeliveryFees,
    isLoading: isGettingDelivery,
    data: deliveryData,
  } = useQueryApiClient({
    request: {
      url: "basket/delivery‑fees/tmapi",
      method: "GET",
      disableOnMount: true,
    },
    onError() {
      message.error(
        t("Cart.errorDeliveryCalc") || "Error calculating delivery"
      );
    },
  });

  const handleOrder = () => {
    if (!cookie.get("token")) {
      return;
    }
    if (itemCount === 0) {
      if (!messageVisible) {
        setMessageVisible(true);
        message.warning(t("Cart.chooseItemM"), 3);
        setTimeout(() => setMessageVisible(false), 1000);
      }
      return;
    }

    if (
      !!createOrderData?.total_price &&
      createOrderData?.total_price < 50000
    ) {
      message.warning(t("Cart.MinOrderSum50000"), 3);
      return;
    }

    const data = createOrderData?.items
      ? createOrderData.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }))
      : [];

    setConfirmModalOpen(true);
    getDeliveryFees({
      data: data,
    });
  };

  return (
    <div className={styles.summaryCard}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{t("Cart.total")}:</h2>
        <p className={styles.totalPrice}>{formatPrice(cost)} uzs</p>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleOrder}
        className={styles.checkoutBtn}
        label={t("Cart.complite")}
      />

      {/* Payment Methods */}
      <div className={styles.paymentMethods}>
        <p className={styles.paymentTitle}>{t("Cart.paymentMethods") || "To'lov usulini tanlash"}</p>
        <div className={styles.paymentOptions}>
          <div className={styles.paymentOption}>
            <span className={styles.paymentIcon}>💵</span>
            <span>{t("Cart.cashPayment") || "Naqdi to'lov"}</span>
          </div>
          <div className={styles.paymentOption}>
            <span className={styles.paymentIcon}>💳</span>
            <span>{t("Cart.cardPayment") || "Plastik karta"}</span>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        footer={null}
        centered
        className={styles.confirmModal}
      >
        {isGettingDelivery || !deliveryData ? (
          <div className={styles.loadingTip}>
            <LoadingSpinner />
            <div className={styles.loadingMessage}>
              <p>{t("Order.calculatingChinaDelivery")}</p>
              <p>{t("Order.calculationMayTakeTime")}</p>
            </div>
          </div>
        ) : (
          <div className={styles.confirmContent}>
            <h2 className={styles.confirmTitle}>{t("Cart.orderSummary")}</h2>

            <div className={styles.confirmRow}>
              <span>{t("Cart.itemsCount")}:</span>
              <span>{deliveryData.total_quantity}</span>
            </div>

            <div className={styles.confirmRow}>
              <span>{t("Cart.product_cost")}:</span>
              <span>{formatPrice(deliveryData.price)} uzs</span>
            </div>

            <div className={styles.confirmRow}>
              <span>{t("Cart.delivery_china")}:</span>
              <span>{formatPrice(deliveryData.delivery_china)} uzs</span>
            </div>

            <div className={styles.confirmTotal}>
              <span>{t("Cart.total")}:</span>
              <span>{formatPrice(deliveryData.total_price)} uzs</span>
            </div>

            <div className={styles.confirmButtonBlock}>
              <Button
                label={t("Cart.complite")}
                className={styles.checkoutBtn}
                isLoading={isLoading}
                onClick={() => {
                  const updatedItems = createOrderData?.items?.map((item) => {
                    const matchingFee = deliveryData?.fees?.find(
                      (fee: any) => fee.basket_item_id === item.id
                    );
                    return {
                      ...item,
                      local_delivery_yuan: matchingFee?.local_delivery_yuan ?? item.local_delivery_yuan ?? 0,
                    };
                  }) || [];

                  createData({
                    ...createOrderData,
                    items: updatedItems,
                    delivery_fees: deliveryData.fees,
                  });
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
