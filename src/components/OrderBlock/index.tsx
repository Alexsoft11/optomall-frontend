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

interface Props {
  cost: number;
  itemValue?: number;
  orderId?: number;
  cargoCost?: string;
  createOrderData?: CreateOrderDataInterface;
  type?: string;
  editOrderData?: EditOrderInterface;
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
}: Props) {
  const t = useTranslations("");
  const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
  // const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
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

  const { appendData: createChequeData } = useQueryApiClient({
    request: {
      url: "add-check",
      method: "POST",
      disableOnMount: true,
      multipart: true,
    },
    onSuccess(res) {
      setCheckModalIsOpen(true);
      setButtonStatus("success");
      setTimeout(() => setButtonStatus("idle"), 1000);
    },
    onError(err) {
      setButtonStatus("fail");
      setTimeout(() => setButtonStatus("idle"), 1000);
    },
  });

  const props = {
    name: "file",
    className: styles.upload_btn,
    showUploadList: false,
    multiple: false,
    beforeUpload: (file: RcFile) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImage) {
        setIsUploadErr(true);
        message.error(t("Cart.imgTypeValidation"));
        return false;
      }
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        setIsUploadErr(true);
        message.error(t("Cart.imgSizeValidation"));
        return false;
      }

      if (editOrderData && setDataFailed) {
        if (!editOrderData?.region || !editOrderData.district) {
          setDataFailed("location");
          setTimeout(() => {
            setDataFailed(null);
          }, 1000);
          message.error(t(`Cart.locationRequired`), 3);
          return false;
        }
        if (!editOrderData?.name || !editOrderData.phone) {
          setDataFailed("personal");
          setTimeout(() => {
            setDataFailed(null);
          }, 1000);
          message.error(t(`Cart.userDataRequired`), 3);
          return false;
        }
      }
    },
    onChange(info: any) {
      if (info.file.status === "done" && !isUploadErr) {
        const image = info.file.originFileObj;
        delete image.uid;

        const formData = new FormData();

        formData.append("type", type as string);
        formData.append("image", image);
        formData.append("order_group_id", orderId!.toString());
        createChequeData(formData);
        setButtonStatus("pending");

        editOrder(editOrderData);
      }
    },
  };

  const toOrder = () => {
    if (!cookie.get("token")) {
      // setAuthModalIsOpen(true);
      return;
    }
    if (itemValue === 0) {
      if (!messageVisible) {
        setMessageVisible(true);
        message.error(t("Cart.chooseItem"), 1);
        setTimeout(() => setMessageVisible(false), 1000);
      }
      return;
    }
    createData(createOrderData);
  };

  return (
    <div className={styles.main}>
      {orderId ? (
        <p className={styles.order_title}>{t("Cart.payment")}</p>
      ) : (
        <p className={styles.order_title}>
          {t("Cart.item")}, {itemValue}
        </p>
      )}
      <div className={styles.total}>
        {/* {cargoCost ? (
          <div className={styles.cargo_title}>
            <p>{t("Cart.cargo")}</p>
            <p>
              {formatPrice(cargoCost)} {t("GLOBAL.currency")} {t("Cart.forKg")}
            </p>
          </div>
        ) : null} */}
        <div>
          <h1>{t("Cart.total")}:</h1>
          <p>{formatPrice(cost)} uzs</p>
        </div>
      </div>
      {orderId ? (
        <Upload {...props}>
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
      ) : null}

      {type === "cart" ? (
        <Button
          onClick={() => toOrder()}
          className={styles.complite_btn}
          label={t("Cart.complite")}
          isLoading={isLoading}
        />
      ) : null}

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
