/** @format */

import React, { useEffect, useState } from "react";
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
  SKU,
  SKUProperty,
} from "../../interface";
import ProductOrderSection from "../ProductOrdeSection";

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
  const t = useTranslations("Product-detail");
  const { skus } = product || {};
  const [selectedColor, setSelectedColor] = useState<SKUProperty | undefined>();
  const [colorsBasket, setColorsBasket] = useState<ColorsBasketInterface[]>([]);
  const sizeMatches = ["size", "Размер", "размер", "hajmi", "specification"];
  const colorMatches = [
    "color",
    "colour",
    "colo",
    "sort by color",
    "цвет",
    "rang",
  ];
  const colorValue = Array.from(
    new Set(
      skus?.flatMap((sku) =>
        sku?.properties
          .filter((prop) => {
            const matches = colorMatches.some((term) =>
              prop.name?.toLowerCase().includes(term)
            );
            return matches;
          })
          .map((prop) => prop.value)
      )
    )
  );

  const handleGetProperty = (value: string, type?: string) => {
    const matchdata =
      type === "color"
        ? ["color", "colour", "colo", "sort by color", "цвет", "rang"]
        : ["size", "hajm", "hajmi", "размер"];
    return skus
      ?.flatMap((sku) => sku.properties)
      .find(
        (prop) =>
          prop.value === value &&
          prop?.name &&
          matchdata.some(
            (term) => prop?.name && prop.name.toLowerCase().includes(term)
          )
      );
  };

  const colors = colorValue
    .map((value) => {
      const properties = handleGetProperty(value, "color");
      return properties;
    })
    ?.filter((data) => data !== undefined);

  const sizes = selectedColor?.value
    ? Array.from(
        new Set(
          skus
            ?.filter((sku) =>
              sku.properties.some((prop) => prop.value === selectedColor.value)
            )
            .flatMap((sku) =>
              sku.properties.filter((prop) => {
                const matches = sizeMatches.some((term) =>
                  prop.name?.toLowerCase().includes(term)
                );
                return matches;
              })
            )
        )
      )
    : Array.from(
        new Set(
          skus?.flatMap((sku) =>
            sku.properties.filter((prop) => {
              const matches = sizeMatches.some((term) =>
                prop.name?.toLowerCase().includes(term)
              );
              return matches;
            })
          )
        )
      );

  const handleColorSelect = (colorProperty?: SKUProperty) => {
    setSelectedColor(colorProperty);
    if (colorProperty?.imageUrl) {
      setSelectedImage(colorProperty.imageUrl);
    }
  };

  const handleResetBasket = () => {
    const colorBasketData = colors.map((color) => ({
      color: color?.value,
      data: [],
    }));
    setColorsBasket(colorBasketData);
    setSelectedColor(colors[0]);
  };

  useEffect(() => {
    handleResetBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          Facebook{" "}
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

        <SliderColors
          colors={colors}
          skus={skus}
          handleColorSelect={handleColorSelect}
          selectedColor={selectedColor}
          colorsBasket={colorsBasket}
        />
      </div>

      <ProductOrderSection
        product={product}
        selectedColor={selectedColor}
        sizes={sizes}
        skus={skus}
        colorsBasket={colorsBasket}
        setColorsBasket={setColorsBasket}
        handleResetBasket={handleResetBasket}
      />
    </div>
  );
};

export default ProductDetailInfo;
