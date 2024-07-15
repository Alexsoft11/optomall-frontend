import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import Link from "next/link";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Tooltip } from "antd";
import CustomImage from "../CustomImage";
import LikedBtn from "../LikedBtn";
import { useRouter } from "next/router";

interface CardProps {
  data: CardInterface;
  isShowLiked?: boolean;
  onLikeChange?: (cardId: number, isLiked: boolean) => void;
}

const Card = ({ data, isShowLiked, onLikeChange }: CardProps) => {
  const t = useTranslations("GLOBAL");
  const textRef = useRef<any>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { current } = textRef;
    if (current) {
      setIsOverflowed(current?.scrollHeight > current?.clientHeight);
    }
  }, [textRef]);
  
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/product/${data.id}`);
  };

  return (
    <div onClick={handleLinkClick} className={styles.card}>
        <div className={styles.card__image}>
          <CustomImage
            className={styles.card__image}
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
      {isShowLiked && (
        <LikedBtn data={data} onLikeChange={onLikeChange}/>
      )}
    </div>
  );
};

export default Card;
