import React, { useState } from "react";
import styles from "./OrderBlock.module.scss";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/ui";
import { useRouter } from "next/router";
import { SuccsessSvg } from "$/assets/images";
import { CreateOrderDataInterface } from "../../features/Cart/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message, Upload } from "antd";
import Cookies from "universal-cookie";
import { RcFile } from "antd/es/upload";
import { formatPrice } from "@/constants";
import { EditOrderInterface } from "@/features/Order/interfaces";
import { UploadProps } from "antd/lib";
import { LoadingSpinner } from "@/ui/Spin";

interface Props {
  cost: number;
  itemValue?: number;
  orderId?: number;
  cargoCost?: string;
  createOrderData?: CreateOrderDataInterface;
  type?: string;
  editOrderData?: EditOrderInterface;
  delivery_china?: number;
  product_cost?: number;
  setDataFailed?: React.Dispatch<
    React.SetStateAction<"personal" | "location" | null>
  >;
}

export default function OrderBlock({
  cost,
  itemValue,
  orderId,
  createOrderData,
  type,
  editOrderData,
  setDataFailed,
  delivery_china,
  product_cost,
}: Props) {
  const t = useTranslations("");
  const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
  const [isUploadErr, setIsUploadErr] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const router = useRouter();
  const [buttonStatus, setButtonStatus] = useState<
    "idle" | "pending" | "success" | "fail"
  >("idle");
  const cookie = new Cookies();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const checkModalClose = () => {
    router.push("/purchases?filter=in_verification");
    setCheckModalIsOpen(false);
  };

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

  const { appendData: editOrder } = useQueryApiClient({
    request: {
      url: "edit-order",
      method: "PUT",
      disableOnMount: true,
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

  const { appendData: createChequeData, isLoading: isLoadingCheck } =
    useQueryApiClient({
      request: {
        url: "add-check",
        method: "POST",
        disableOnMount: true,
        multipart: true,
      },
      onSuccess() {
        setCheckModalIsOpen(true);
        setButtonStatus("success");
        setTimeout(() => setButtonStatus("idle"), 1000);
      },
      onError() {
        setButtonStatus("fail");
        setTimeout(() => setButtonStatus("idle"), 1000);
      },
    });

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const validateFields = () => {
    if (editOrderData && setDataFailed) {
      if (!editOrderData.region || !editOrderData.district) {
        setDataFailed("location");
        message.error(t("Cart.locationRequired"), 3);
        setTimeout(() => setDataFailed(null), 1000);
        return false;
      }
      if (!editOrderData.name || !editOrderData.phone) {
        setDataFailed("personal");
        message.error(t("Cart.userDataRequired"), 3);
        setTimeout(() => setDataFailed(null), 1000);
        return false;
      }
    }
    return true;
  };

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error("Error resizing image"));
            }
          },
          file.type,
          1
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadProps: UploadProps = {
    name: "file",
    showUploadList: false,
    multiple: false,
    beforeUpload: (file: RcFile) => {
      if (!allowedTypes.includes(file.type)) {
        setIsUploadErr(true);
        message.error(t("Cart.imgTypeValidation"));
        return false;
      }
      if (!validateFields()) {
        return false;
      }
      return true;
    },
    onChange: async (info: any) => {
      if (info.file.status === "done" && !isUploadErr) {
        setButtonStatus("pending");
        try {
          const resizedFile = await resizeImage(
            info.file.originFileObj as File
          );
          const formData = new FormData();
          formData.append("image", resizedFile);
          formData.append("type", type as string);
          formData.append("order_group_id", orderId!.toString());
          createChequeData(formData);
          editOrder(editOrderData);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
  };

  const handleOrder = () => {
    if (!cookie.get("token")) {
      return;
    }
    if (itemValue === 0) {
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

  // Check if this is Order page (has orderId)
  const isOrderPage = !!orderId;

  return (
    <div className={styles.main}>
      {/* Title */}
      <p className={styles.order_title}>
        {isOrderPage ? t("Order.confirmPayment") : `${t("Cart.item")}, ${itemValue}`}
      </p>

      {/* Price Summary - ALWAYS show on Order page */}
      <div className={styles.priceSection}>
        {isOrderPage && (
          <>
            <div className={styles.priceRow}>
              <span>{t("Cart.product_cost")}:</span>
              <span className={styles.priceValue}>{formatPrice(product_cost || 0)} uzs</span>
            </div>
            <div className={styles.priceRow}>
              <span>{t("Cart.delivery_china")}:</span>
              <span className={styles.priceValue}>{formatPrice(delivery_china || 0)} uzs</span>
            </div>
          </>
        )}
        <div className={styles.totalRow}>
          <span>{t("Cart.total")}:</span>
          <span className={styles.totalValue}>{formatPrice(cost)} uzs</span>
        </div>
      </div>

      {/* Upload Button - Order page only */}
      {isOrderPage && (
        <div className={styles.upload_section}>
          <Upload {...uploadProps} accept="image/*">
            <button 
              className={styles.uploadButton}
              disabled={buttonStatus === "pending"}
            >
              {buttonStatus === "idle" && t("Cart.loadCheque")}
              {buttonStatus === "pending" && <LoadingSpinner size="small" />}
              {buttonStatus === "success" && "✓"}
              {buttonStatus === "fail" && "✗"}
            </button>
          </Upload>
        </div>
      )}

      {/* Create Order Button - Cart page only */}
      {type === "cart" && (
        <Button
          onClick={handleOrder}
          className={styles.complite_btn}
          label={t("Cart.complite")}
          isLoading={isLoadingCheck}
        />
      )}

      <Modal
        onCancel={checkModalClose}
        className="bg_white"
        img={SuccsessSvg}
        description={t("Cart.checkMessage")}
        open={checkModalIsOpen}
      />
      
      {/* Confirm Modal */}
      <Modal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        footer={null}
        centered
        className={styles.confirm_modal}
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
          <div className={styles.confirm_content}>
            <h2 className={styles.confirm_title}>{t("Cart.orderSummary")}</h2>
            
            <div className={styles.confirm_row}>
              <span>{t("Cart.itemsCount")}:</span>
              <span>{deliveryData.total_quantity}</span>
            </div>

            <div className={styles.confirm_row}>
              <span>{t("Cart.product_cost")}:</span>
              <span>{formatPrice(deliveryData.price)} uzs</span>
            </div>

            <div className={styles.confirm_row}>
              <span>{t("Cart.delivery_china")}:</span>
              <span>{formatPrice(deliveryData.delivery_china)} uzs</span>
            </div>

            <div className={styles.confirm_total}>
              <span>{t("Cart.total")}:</span>
              <span>{formatPrice(deliveryData.total_price)} uzs</span>
            </div>

            <div className={styles.confirm_button_block}>
              <Button
                label={t("Cart.complite")}
                className={styles.complite_btn}
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
