import React from "react";
import styles from "./PageNoItems.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Button } from "@/ui";
import Image from "next/image";
import { BasketSvg } from "$/assets/images";

interface Props {
  title?: string;
  text?: string;
  customBtnFunc?: () => void;
}

const PageNoItems = ({ text, title, customBtnFunc }: Props) => {
  const t = useTranslations("Cart");
  const router = useRouter();

  return (
    <div className={styles.main}>
      <Image
        className={styles.img}
        src={BasketSvg}
        width={58}
        height={58}
        alt="#"
      />
      <h1>{title}</h1>

      {text ? (
        <div className={styles.button_block}>
          <Button
            onClick={() => {
              if (customBtnFunc) {
                return customBtnFunc();
              }
              router.push("/");
            }}
            type="primary"
            htmlType="submit"
            className="generalbtn"
            label={text}
          />
        </div>
      ) : null}
    </div>
  );
};
export default PageNoItems;
