/*************  ✨ Codeium Command 🌟  *************/
/**
 * @file Card component
 *
 * @param {CardProps} props
 * @returns {JSX.Element}
 */
import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import styles from "./Card.module.scss";
import { CardInterface } from "@/interfaces";
import CustomImage from "../CustomImage";
import LikedBtn from "../LikedBtn";
import { formatPrice } from "@/constants";
import useProductStore from "../../store/useProductStore";

/**
 * Card component props
 */
interface CardProps {
  /**
   * Data object with card data
   */
  data: CardInterface;
  /**
   * Function to call when user clicks on like button
   */
  onLikeChange?: (cardId: number) => void;
  /**
   * If true, card will be rendered without any content
   */
  isBlank?: boolean;
  /**
   * If true, animation will be enabled
   */
  enableAnimation?: boolean;
}

/**
 * Card component
 *
 * @param {CardProps} props
 * @returns {JSX.Element}
 */
const Card: React.FC<CardProps> = ({
  data,
  onLikeChange,
  isBlank,
  enableAnimation = true,
}) => {
  const t = useTranslations("GLOBAL");
  const textRef = useRef<any>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { setScrollPosition } = useProductStore();
  const provider = data.provider === "Alibaba1688" ? "1688" : data.provider;

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
    let url = `/${router.locale}/product/${id}?provider=${
      provider || router.query.provider || "1688"
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
    <div
      className={styles.card}
      {...(enableAnimation && {
        "data-aos": "fade-up",
        "data-aos-duration": "600",
      })}
    >
      <div onClick={handleLinkClick}>
        <div className={styles.card__image}>
          <CustomImage
            className={styles.card__image}
            src={data.image}
            alt={title}
            fill={false}
            isLink={false}
            loading="lazy"
            width={1000}
            height={1000}
          />
        </div>

        {typeof window !== "undefined" && window.innerWidth <= 768 ? (
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
