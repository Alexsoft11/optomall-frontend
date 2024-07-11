/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Tooltip } from "antd";
import { BASE_URL } from "@/services/api";

interface CardProps {
  data: CardInterface;
  idx: number;
}

const Card = ({ data, idx }: CardProps) => {
  const t = useTranslations("GLOBAL");
  const textRef = useRef<any>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const { current } = textRef;
    if (current) {
      setIsOverflowed(current?.scrollHeight > current?.clientHeight);
    }
  }, [textRef]);

  return (
    <>
      <div className={styles.card}>
        <Link href={`product/${data.id}`} key={idx}>
          <div className={styles.card__image}>
            <Image src={data.image} alt="img" width={1000} height={1000} />
          </div>

          <Tooltip
            overlayClassName="tooltip-white"
            title={isOverflowed ? data.title : ""}
          >
            <h2 className={styles.card__title} ref={textRef}>
              {data.title}
            </h2>
          </Tooltip>

          <div className={styles.card__price}>
            <p>
              {data.price} {t("currency")} 
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
