import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import { CardInterface } from "@/interfaces";
import { useLocale, useTranslations } from "next-intl";
import { Tooltip } from "antd";
import CustomImage from "../CustomImage";
import LikedBtn from "../LikedBtn";
import { useRouter } from "next/router";
import { useJwt } from "@/utils/useJwt";

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
  const locale = useLocale();
  const token = useJwt();
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

  // Extract title based on locale
  const getTitle = (
    title: any | { uz: string; ru: string; en: string } | undefined
  ) => {
    if (typeof title === "object" && title !== null) {
      return title[locale] || title["ru"] || title["uz"] || title["en"] || "";
    }
    return title || "";
  };

  const title = getTitle(data.title);

  return (
    <div className={styles.card}>
      <div onClick={handleLinkClick}>
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
          title={isOverflowed ? title : ""}
        >
          <h2 className={styles.card__title} ref={textRef}>
            {title}
          </h2>
        </Tooltip>

        <div className={styles.card__price}>
          <p>
            {data.price} {t("currency")}
          </p>
        </div>
      </div>
      <LikedBtn
        isLike={data.is_liked}
        id_filter={+data.id || undefined}
        product_id={data.product_id}
        onLikeChange={onLikeChange}
        card={data}
      />
    </div>
  );
};

export default Card;
