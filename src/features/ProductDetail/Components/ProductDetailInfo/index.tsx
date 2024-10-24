/** @format */

import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./ProductDetailInfo.module.scss";
import { Button, Dropdown, Rate } from "antd";
import SliderColors from "../SliderColors";
import { MenuProps } from "antd/lib";
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import { shareUrl } from "@/constants";
import ProductIsLike from "../ProductIsLike/ProductIsLike";
import { useTranslations } from "next-intl";
import { copyLinkToClipboard } from "@/utils/useCopyLink";
import {
  ColorsBasketInterface,
  ProductDetailInterface,
  SKUProperty,
} from "../../interface";
import ProductOrderSection from "../ProductOrdeSection";
import { ArrowRight, TravelDateImg } from "$/assets/images";
import Image from "next/image";

interface Props {
  productDetails?: any;
  product?: ProductDetailInterface;
  path?: any;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductDetailInfo: React.FC<Props> = ({
  productDetails,
  product,
  path = shareUrl(),
  setSelectedImage,
}) => {
  const [showAll, setShowAll] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (pixels: number = 100): void => {
    window.scrollTo({
      top: window.scrollY - pixels,
      behavior: "smooth",
    });
  };

  const handleToggleShowAll = () => {
    if (showAll && divRef?.current) {
      const height = divRef.current.offsetHeight;
      scrollToTop(height - 50);
    }
    setShowAll(!showAll);
  };

  const t = useTranslations("Product-detail");

  const items: MenuProps["items"] = [
    {
      label: (
        <p
          className={styles.link}
          onClick={(event) => copyLinkToClipboard(event, "location")}
        >
          <SvgSelector id="copylink-svg" />
          {t("copy-link")}
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          href={`https://t.me/share/url?url=${path}`}
          className={styles.link}
        >
          <SvgSelector id="telegram-svg" />
          Telegram
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link href={path} className={styles.link}>
          <SvgSelector id="facebook-svg" />
          Facebook
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link href={path} className={styles.link}>
          <SvgSelector id="instagram-svg" />
          Instagram
        </Link>
      ),
      key: "4",
    },
  ];

  return (
    <div className={styles.product_info_detail}>
      <div className={styles.info_block}>
        <div className={styles.productInfo}>
          <div className={styles.info_head}>
            <div className={styles.rating}>
              <Rate disabled defaultValue={productDetails.rating} />
              <span>{productDetails.rating}</span>
              <span>
                ({productDetails.sold}) {t("bought")}
              </span>
            </div>
            <div className={styles.product_actions}>
              <ProductIsLike product={product} />
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <SvgSelector id="share-icon" />
                </a>
              </Dropdown>
            </div>
          </div>
          <h1>{product?.title}</h1>

          {/* <SliderColors
          skus={skus}
          selectedColor={selectedColor}
          colorsBasket={colorsBasket}
        /> */}
        </div>
        <div ref={divRef} className={styles.productDetails}>
          {(showAll
            ? product?.composition
            : product?.composition?.slice(0, 4)
          )?.map((el, idx) => (
            <Fragment key={idx}>
              <div className={styles.detail}>
                <span className={styles.detail_category}>{el.key}</span>
                <p className={styles.detail_value}>{el.value}</p>
              </div>
            </Fragment>
          ))}
          {product?.composition && product?.composition?.length > 4 && (
            <button
              onClick={handleToggleShowAll}
              className={styles.showAllButton}
            >
              {showAll ? t("hide") : t("allSpecificationsAndDescription")}
            </button>
          )}
          <button className={styles.travelDate}>
            <Image src={TravelDateImg} width={14} height={14} alt="#" />
            <p>{t("order")}</p>
            <Image src={ArrowRight} width={14} height={14} alt="#" />
          </button>
        </div>
      </div>

      <ProductOrderSection product={product} />
    </div>
  );
};

export default ProductDetailInfo;
