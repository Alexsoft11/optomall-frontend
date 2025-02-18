import React, { useEffect, useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
import RecomendedProducts from "../RecomendedProducts";
import { Tabs, TabsProps } from "antd";
import ProductDescription from "../ProductDescription";
import { useTranslations } from "next-intl";
import GoToBack from "@/components/GoToBack";
import { useRouter } from "next/router";
import { ProductDetailInterface } from "../../interface";

interface Props {
  product: ProductDetailInterface;
  score?: {
    rating: number;
    sold: number;
  };
  recommended: any;
}

const ProductDetailSection = ({ product, recommended, score }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const t = useTranslations("Product-detail");

  const { category, provider } = router.query;

  const pathArr = category
    ? [
        {
          titleNotr: category as string,
          path: `/search?value=${category}&provider=${provider}`,
        },
      ]
    : [];

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("characteristic"),
      children: <ProductDescription descImages={product.description_images} />,
    },
    {
      key: "2",
      label: t("comments"),
      children: <Reviews />,
    },
  ];

  return (
    <>
      <div className="container">
        <GoToBack pathArr={pathArr} />
        <div className="containers">
          <div className={styles.product}>
            <div className={styles.product__inner}>
              <ProductDetailImages
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                product={product}
              />
              <ProductDetailInfo
                setSelectedImage={setSelectedImage}
                productDetails={score}
                product={product}
              />
            </div>
          </div>
          <div className={styles.product_description}>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
          <RecomendedProducts recomendedData={recommended} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailSection;
