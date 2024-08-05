/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
import RecomendedProducts from "../RecomendedProducts";
import { Tabs, TabsProps } from "antd";
import ProductDescription from "../ProductDescription";
import { useTranslations } from "next-intl";
const ProductDetailSection = ({
  product,
  recommended,
  score,
  productComments,
}: any) => {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const t = useTranslations("Product-detail");
  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t(""),
      children: <ProductDescription description={product.description} />,
    },
    {
      key: "2",
      label: t("comments"),
      children: <Reviews comments={productComments} />,
    },
  ];

  return (
    <>
      <div className="container">
        <div className="containers">
          <div className={styles.product}>
            <div className={styles.product__inner}>
              <ProductDetailImages
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                product={product}
              />
              <ProductDetailInfo
                productDetails={score}
                setSelectedImage={setSelectedImage}
                product={product}
              />
            </div>
          </div>
          <div>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
          <RecomendedProducts recomendedData={recommended} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailSection;
