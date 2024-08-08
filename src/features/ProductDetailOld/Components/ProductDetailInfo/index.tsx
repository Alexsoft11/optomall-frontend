/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailInfo.module.scss";
import { Button, Dropdown, Rate } from "antd";
import SliderColors from "../SliderColors";
import ProductOrderSection from "../ProductOrdeSection";
import { MenuProps } from "antd/lib";
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import { shareUrl } from "@/constants";
import ProductIsLike from "../ProductIsLike/ProductIsLike";
import { productDetailsData } from "@/mockdata/detailData";
import { useTranslations } from "next-intl";
import { copyLinkToClipboard } from "@/utils/useCopyLink";

const ProductDetailInfo = ({
  productDetails,
  product,
  path = shareUrl(),
}: any) => {
  const t = useTranslations("Product-detail");
  // const [activeItem, setActiveItem] = useState<number>(product.colors[0]?.id);
  const [fakeColorsData, setFakeColorsData] = useState<any>();
  const [selectedColor, setSelectedColor] = useState<number | null>(
    product.colors[0]?.id
  );
  const [selectedColors, setSelectedColors] = useState<number[]>([
    product.colors[0]?.id,
  ]);
  const [totalQuantities, setTotalQuantities] = useState<{
    [key: number]: number;
  }>({});

  const items: MenuProps["items"] = [
    {
      label: (
        <p
          className={styles.link}
          onClick={(event) => copyLinkToClipboard(event, "location")}>
          <SvgSelector id='copylink-svg' />
          {t("copy-link")}
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          href={`https://t.me/share/url?url=${path}`}
          className={styles.link}>
          <SvgSelector id='telegram-svg' />
          Telegram
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link href={path} className={styles.link}>
          <SvgSelector id='facebook-svg' />
          Facebook{" "}
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link href={path} className={styles.link}>
          <SvgSelector id='instagram-svg' />
          Instagram
        </Link>
      ),
      key: "4",
    },
  ];
  const productUrl = product.product_url ? product.product_url : "";
console.log(product.colors.length)
useEffect(()=>{
  if (product.colors.length <= 0) {
    setFakeColorsData([{id: 1},
    ]);
  }
},[])
  console.log("dii", fakeColorsData);
  return (
    <div className={styles.product_info_detail}>
      <div className={styles.productInfo}>
        <div className={styles.info_head}>
          <div className={styles.rating}>
            <Rate disabled defaultValue={productDetails.rating} />
            <span>{productDetails.rating}</span>
            <span>
              ({productDetails.sold}){t("bought")}
            </span>
          </div>
          <div className={styles.product_actions}>
            <ProductIsLike product={product} />
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement='bottomRight'>
              <a onClick={(e) => e.preventDefault()}>
                <SvgSelector id='share-icon' />
              </a>
            </Dropdown>
          </div>
        </div>
        <h1>{product?.title}</h1>

        <SliderColors
          data={product.colors}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          totalQuantities={totalQuantities}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          fakeColorsData={fakeColorsData}
        />

        <div className={styles.productSpecs}>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Url</span>
              <div></div>
            </div>
            <div className={styles.product_link}>
              <Link href={productUrl}>{product.id}</Link>
              <p
                onClick={(event) =>
                  copyLinkToClipboard(event, "url", product.product_url)
                }>
                <SvgSelector id='copylinkicon-svg' />
              </p>
            </div>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>{t("compound")}</span>
              <div></div>
            </div>
            <p>{productDetailsData.composition}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>{t("made_country")}</span>
              <div></div>
            </div>
            <p>{product.location}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>{t("model_features")}</span>
              <div></div>
            </div>
            <p>{productDetailsData.features}</p>
          </li>
        </div>
      </div>

      <ProductOrderSection
        totalQuantities={totalQuantities}
        product={product}
        selectedColor={selectedColor}
        setTotalQuantities={setTotalQuantities}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default ProductDetailInfo;
