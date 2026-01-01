import React, { useEffect, useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
import Shop from "../Shop";
import RecomendedProducts from "../RecomendedProducts";
import { Tabs, TabsProps } from "antd";
import ProductDescription from "../ProductDescription";
import { useTranslations } from "next-intl";
import GoToBack from "@/components/GoToBack";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductDetailInterface } from "../../interface";
import SvgSelector from "$/assets/icons/SvgSelector";
import { IGoToBackObject } from "@/components/Types";

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

  const shopName =
    product.seller_info?.shop_name ||
    product.seller_info?.company_name ||
    t("shop");
  const sellerId =
    product.seller_info?.seller_member_id || product.seller_id;

  const pathArr: IGoToBackObject[] = category
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
    {
      key: "3",
      label: t("shop"),
      children: <Shop sellerId={product.seller_info?.seller_member_id || product.seller_id} />,
    },
  ];

  return (
    <>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <GoToBack pathArr={pathArr} />
          {sellerId && (
            <Link 
              href={`/shop/${sellerId}`} 
              target="_blank" 
              style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "inherit", fontWeight: 500 }}
            >
              <span style={{ width: 16, height: 16, display: "flex", alignItems: "center" }}>
                 <SvgSelector id="shop-icon" />
              </span>
              <span>{t("shop")}</span>
            </Link>
          )}
        </div>
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
