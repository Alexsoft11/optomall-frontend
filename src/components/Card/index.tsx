/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Tooltip } from "antd";
import { BASE_URL } from "@/services/api";
import CustomImage from "../CustomImage";
import { Checkbox, Input } from "@/ui";

interface CardProps {
  data: CardInterface;
  idx: number;
  isShowLiked: boolean;
}

const Card = ({ data, idx, isShowLiked }: CardProps) => {
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
            <CustomImage
              className={styles.card__image}
              imgClass=""
              src={data.image}
              alt="img"
              fill={false}
              isLink={false}
              loading="lazy"
              width={1000}
              height={1000}
            />
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
        {
          isShowLiked && (
            <label className={styles.wish}>
              <input defaultChecked={true} type="checkbox" />
              <div className={styles.checkmark}>
                <svg viewBox="0 0 256 256">
                  <rect fill="none" height={256} width={256} />
                  <path
                    d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                    strokeWidth="20px"
                    stroke="#FFF"
                    fill="none"
                  />
                </svg>
              </div>
            </label>
          )
        }
      </div>
    </>
  );
};

export default Card;
