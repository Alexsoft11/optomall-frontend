/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button, message } from "antd";
import { MinusSvg, PlusSvg } from "$/assets/images";
import Image from "next/image";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useJwt } from "@/utils/useJwt";
import { formatPrice } from "@/constants";

interface Size {
  id: number;
  value: string;
  size_id?: number;
}

interface Product {
  title: string;
  id: number;
  discounted_price: number;
  discount_percentage: number;
  price: number;
  sizes: Size[];
  colors: Color[];
}

interface Color {
  id: number;
  image_url: string;
  name: string;
  value: string;
}

interface ProductOrderSectionProps {
  product: Product;
  setTotalQuantities: any;
  selectedColor: any;
  selectedColors: number[];
  setSelectedColors: any;
  totalQuantities?: any;
  setSelectedColor: any;
}

interface SelectedSizes {
  [colorId: number]: {
    value: string;
    quantity: number;
  }[];
}

const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({
  product,
  selectedColor,
  selectedColors,
  setTotalQuantities,
  setSelectedColors,
  totalQuantities,
  setSelectedColor,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const defaultSizes = [{ id: 1, value: "default" }];
  const user = useJwt();

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      setLoading(false);
      resetStates();
    },
  });

  const initialSizeState = product.colors.reduce(
    (acc: SelectedSizes, color: Color) => {
      acc[color.id] = (
        product.sizes.length > 0 ? product.sizes : defaultSizes
      ).map((size) => ({
        value: size.value,
        quantity: 0,
      }));
      return acc;
    },
    {}
  );
  const [selectedSizes, setSelectedSizes] =
    useState<SelectedSizes>(initialSizeState);

  const handleSizeChange = (
    colorId: number,
    sizeValue: string,
    increment: number
  ) => {
    setSelectedSizes((prev: SelectedSizes) => {
      const newSizes = { ...prev };
      const sizeIndex = newSizes[colorId]?.findIndex(
        (size) => size.value === sizeValue
      );
      if (sizeIndex !== -1) {
        newSizes[colorId][sizeIndex] = {
          ...newSizes[colorId][sizeIndex],
          quantity: Math.max(
            0,
            newSizes[colorId][sizeIndex].quantity + increment
          ),
        };
      }
      return newSizes;
    });
  };

  const calculateTotalQuantities = () => {
    const totals: { [key: number]: number } = {};
    let totalQuantity = 0;

    for (const colorId in selectedSizes) {
      if (selectedColors.includes(Number(colorId))) {
        const colorTotal = selectedSizes[colorId]?.reduce(
          (sum: number, size: any) => sum + size.quantity,
          0
        );
        totals[colorId] = colorTotal;
        totalQuantity += colorTotal;
      }
    }

    setTotalQuantities(totals);
  };
  const calculateTotalPrice = () => {
    let total = 0;
    for (const colorId in selectedSizes) {
      if (selectedColors.includes(Number(colorId))) {
        total += selectedSizes[colorId]?.reduce(
          (sum: number, size: any) => sum + size.quantity * product.price,
          0
        );
      }
    }
    setTotalPrice(total);
  };

  const isProductSelected = () => {
    return selectedColors.some((colorId) =>
      selectedSizes[colorId]?.some((size) => size.quantity > 0)
    );
  };

  const onFinish = () => {
    setLoading(true);
    try {
      const sizes = selectedColors.flatMap((colorId) =>
        selectedSizes[colorId]
          ?.filter((size: any) => size.quantity > 0)
          .map((size: any) => ({
            ...size,
            color_id: colorId.toString(),
          }))
      );
      const data = {
        product_id: product.id.toString(),
        sizes,
      };
      const localeData = selectedColors.flatMap((colorId) =>
        selectedSizes[colorId]
          ?.filter((size: any) => size.quantity > 0)
          .map((size: any) => ({
            product_id: product.id.toString(),
            price: product.price,
            title: product.title,
            image_url:
              product.colors.find((img) => img.id === colorId)?.image_url || "",
            size: size.value,
            size_id:
              product.sizes.find((el) => el.value === size.value)?.id || "",
            quantity: size.quantity,
            color:
              product.colors.find((color) => color.id === colorId)?.value || "",
            color_id: colorId,
          }))
      );
      if (user) {
        createData([data]);
      } else {
        const newBasketData = (
          JSON.parse(localStorage.getItem("basket-data") as string) || []
        ).concat(localeData);
        localStorage.setItem("basket-data", JSON.stringify(newBasketData));
        message.success("Added to Basket");
        resetStates();
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateTotalQuantities();
    calculateTotalPrice();
  }, [selectedSizes, selectedColors]);
  const resetStates = () => {
    let firstElement = product.colors[0]?.id;
    setSelectedSizes(initialSizeState);
    setSelectedColors([product.colors[0]?.id]);
    setTotalQuantities({ 10: 0 });
    setSelectedColor(product.colors[0]?.id);
  };

  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>
          {formatPrice(product.price)} uzs
        </span>
        {product.discounted_price &&
        product.price !== product.discounted_price ? (
          <>
            <span className={styles.discount}>
              -{product.discount_percentage}%
            </span>
            <span className={styles.originalPrice}>
              {formatPrice(product.discounted_price)} uzs
            </span>
          </>
        ) : null}
      </div>
      {selectedColor !== null && (
        <div className={`${styles.sizeSelector}`}>
          {(product.sizes.length > 0 ? product.sizes : defaultSizes).map(
            (size, idx) => (
              <div key={idx} className={styles.size}>
                <span
                  className={`${
                    size.value === "default" ? styles.text_hidden : ""
                  }`}
                >
                  {size.value}
                </span>
                <div className={styles.change_value}>
                  <Button
                    onClick={() =>
                      handleSizeChange(selectedColor, size.value, -1)
                    }
                  >
                    <Image src={MinusSvg} width={24} height={24} alt="#" />
                  </Button>
                  <h4 className={styles.selected_quantity}>
                    {selectedSizes[selectedColor]?.find(
                      (s: any) => s.value === size.value
                    )?.quantity || 0}
                  </h4>
                  <Button
                    onClick={() =>
                      handleSizeChange(selectedColor, size.value, 1)
                    }
                  >
                    <Image src={PlusSvg} width={24} height={24} alt="#" />
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className={styles.add_basket}>
        <div className={styles.total}>
          <p>Итого</p>
          <span className={styles.total_quantity}>
            {formatPrice(totalPrice)} uzs
          </span>
        </div>
        <Button
          loading={loading}
          className={styles.addToCart}
          onClick={onFinish}
          disabled={!isProductSelected()}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductOrderSection;
