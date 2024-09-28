import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import { CardInterface } from "@/interfaces";
import { useLocale, useTranslations } from "next-intl";
import { Tooltip } from "antd";
import CustomImage from "../CustomImage";
import LikedBtn from "../LikedBtn";
import { useRouter } from "next/router";
import { formatPrice } from "@/constants";
import useSearchStore from "../../store/useSearchStore";

interface CardProps {
  data: CardInterface;
  onLikeChange?: (cardId: number) => void;
  isBlank?: boolean;
}

const Card = ({
  data,
  onLikeChange,
  isBlank,
}: CardProps) => {
  const t = useTranslations("GLOBAL");
  const textRef = useRef<any>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { setScrollPosition } = useSearchStore();
  const provider = data.provider == 'Alibaba1688' ? '1688' : data.provider
  useEffect(() => {
    const { current } = textRef;
    if (current) {
      setIsOverflowed(current?.scrollHeight > current?.clientHeight);
    }
  }, [textRef]);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setScrollPosition(window.scrollY);

    const id = router.pathname.includes("wishes") ? data.product_id : data.id;
    let url = `/${router.locale}/product/${id}?provider=${provider || router.query.provider || "1688"
      }`;
    if (router.pathname.includes("search") && router.query.value) {
      url = `${url}&category=${router.query.value}`;
      if (router.query.carId) {
        url = `${url}&catId=${router.query.catId}`;
      }
    }
    if (e.ctrlKey || e.metaKey || isBlank) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

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
    <div className={styles.card} data-aos="fade-up" data-aos-duration="1200">
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

        {window.innerWidth <= 768 ? (
          <h2 className={styles.card__title}>{title}</h2>
        ) : (
          <Tooltip
            overlayClassName="tooltip-white"
            title={isOverflowed ? title : ""}
          >
            <h2 className={styles.card__title} ref={textRef}>
              {title}
            </h2>
          </Tooltip>
        )}

        <div className={styles.card__price}>
          <p>
            {formatPrice(data.price)} {t("currency")}
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
