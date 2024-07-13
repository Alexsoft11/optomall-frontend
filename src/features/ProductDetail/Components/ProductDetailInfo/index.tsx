/** @format */

import React, { useState } from "react";
import styles from "./ProductDetailInfo.module.scss";
import { Dropdown, Rate } from "antd";
import SliderColors from "../SliderColors";
import ProductOrderSection from "../ProductOrdeSection";
import { MenuProps } from "antd/lib";
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import { shareUrl } from "@/constants";

const ProductDetailInfo = ({
  productDetails,
  setSelectedImage,
  product,
  path=shareUrl()
}: any) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(
    product.colors[0].id
  );
  const [selectedColors, setSelectedColors] = useState<number[]>([
    product.colors[0].id,
  ]);
  const [totalQuantities, setTotalQuantities] = useState<{
    [key: number]: number;
  }>({});
  const items: MenuProps["items"] = [
    {
      label: <Link href={path}><SvgSelector id="tg-icon"/>Telegram</Link>,
      key: "0",
    },
    {
      label: <Link href={path}><SvgSelector id="tg-icon"/>Facebook </Link>,
      key: "1",
    },
    {
      label: <Link href={path}><SvgSelector id="tg-icon"/>Instagram</Link>,
      key: "2",
    },
  ];

  return (
    <div className={styles.product_info_detail}>
      <div className={styles.productInfo}>
        <div className={styles.info_head}>
          <div className={styles.rating}>
            <Rate disabled defaultValue={productDetails.rating} />
            <span>{productDetails.rating}</span>
            <span>({productDetails.reviews} купили)</span>
          </div>
          <div>
            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}><SvgSelector id="share-icon"/></a>
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
        />

        <div className={styles.productSpecs}>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Url</span>
              <div></div>
            </div>
            <p>{productDetails.productId}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Состав</span>
              <div></div>
            </div>
            <p>{productDetails.composition}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Размер на модели</span>
              <div></div>
            </div>
            <p>{productDetails.modelSize}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Страна производства</span>
              <div></div>
            </div>
            <p>{product.location}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Особенности модели</span>
              <div></div>
            </div>
            <p>{productDetails.features}</p>
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
      />
    </div>
  );
};

export default ProductDetailInfo;
