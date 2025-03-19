import React, { useState } from "react";
import styles from "./OrderBlock.module.scss";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@/ui";
import { useRouter } from "next/router";
import { SearchSvg } from "$/assets/images";
import { CreateOrderDataInterface } from "../../features/Cart/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message, Upload } from "antd";
import Cookies from "universal-cookie";
import { RcFile } from "antd/es/upload";
import { formatPrice } from "@/constants";
import { EditOrderInterface } from "@/features/Order/interfaces";
import { UploadProps } from "antd/lib";

interface Props {
  cost: number;
  itemValue?: number;
  orderId?: number;
  cargoCost?: string;
  createOrderData?: CreateOrderDataInterface;
  type?: string;
  editOrderData?: EditOrderInterface;
  delivery_china?: number;
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
  cargoCost,
  editOrderData,
  setDataFailed,
  delivery_china,
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

  const buttonClass = `${styles["loading-btn"]} ${
    buttonStatus === "pending"
      ? styles["loading-btn--pending"]
      : buttonStatus === "success"
      ? styles["loading-btn--success"]
      : buttonStatus === "fail"
      ? styles["loading-btn--fail"]
      : ""
  }`;

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
      // setAuthModalIsOpen(true);
      return;
    }
    if (itemValue === 0) {
      if (!messageVisible) {
        setMessageVisible(true);
        message.warning(t("Cart.chooseItem"), 1);
        setTimeout(() => setMessageVisible(false), 1000);
      }
      return;
    }
    createData(createOrderData);
  };

  return (
    <div className={styles.main}>
      <p className={styles.order_title}>
        {orderId ? t("Cart.payment") : `${t("Cart.item")}, ${itemValue}`}
      </p>
      <div className={styles.total}>
        <div>
          <h1>{t("Cart.total")}:</h1>
          <p>{formatPrice(cost)} uzs</p>
        </div>
        {delivery_china && (
          <div className={styles.china_delivery}>
            <h1>{t("Cart.delivery_china")}:</h1>
            <p>{formatPrice(delivery_china)} uzs</p>
          </div>
        )}
      </div>
      {orderId && (
        <div className={styles.upload_btn}>
          <Upload {...uploadProps} accept="image/*">
            <div className={styles.response_button__block}>
              <span className={styles["loading-btn-wrapper"]}>
                <button
                  className={buttonClass}
                  disabled={buttonStatus === "pending"}
                >
                  <span className={styles["loading-btn__text"]}>
                    {buttonStatus === "idle" && t("Cart.loadCheque")}
                  </span>
                </button>
              </span>
            </div>
          </Upload>
        </div>
      )}
      {type === "cart" && (
        <Button
          onClick={handleOrder}
          className={styles.complite_btn}
          label={t("Cart.complite")}
          isLoading={isLoading || isLoadingCheck}
        />
      )}
      <Modal
        onCancel={checkModalClose}
        className="bg_white"
        img={SearchSvg}
        description={t("Cart.checkMessage")}
        open={checkModalIsOpen}
      />
      {/* <Modal {...modalProps} /> */}
    </div>
  );
}
