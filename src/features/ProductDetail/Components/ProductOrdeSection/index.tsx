/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button, message } from "antd";
import { MinusSvg, PlusSvg } from "$/assets/images";
import Image from "next/image";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Size {
  id: number;
  value: string;
}

interface Product {
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
}

interface ProductOrderSectionProps {
  product: Product;
  setTotalQuantities: any;
  selectedColor: any;
  selectedColors: number[];
  setSelectedColors: any;
  totalQuantities?: any;
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
}) => {
  const { appendData: createData } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      console.log(res)
      resetStates();
    },
  });

  const initialSizeState = product.colors.reduce((acc: SelectedSizes, color: Color) => {
    acc[color.id] = product.sizes.map((size) => ({ value: size.value, quantity: 0 }));
    return acc;
  }, {});

  const [selectedSizes, setSelectedSizes] = useState<SelectedSizes>(initialSizeState);

  const handleSizeChange = (colorId: number, sizeValue: string, increment: number) => {
    setSelectedSizes((prev: SelectedSizes) => {
      const newSizes = { ...prev };
      const sizeIndex = newSizes[colorId].findIndex((size) => size.value === sizeValue);
      if (sizeIndex !== -1) {
        newSizes[colorId][sizeIndex].quantity += increment;
        if (newSizes[colorId][sizeIndex].quantity < 0) {
          newSizes[colorId][sizeIndex].quantity = 0;
        }
      }
      return newSizes;
    });
  };

  const calculateTotalQuantities = () => {
    const totals: { [key: number]: number } = {};
    let totalQuantity = 0;
    for (const colorId in selectedSizes) {
      if (selectedColors.includes(Number(colorId))) {
        const colorTotal = selectedSizes[colorId].reduce(
          (sum: number, size: any) => sum + size.quantity,
          0
        );
        totals[colorId] = colorTotal;
        totalQuantity += colorTotal;
      }
    }
    setTotalQuantities(totals);
    console.log(totals)
    // setTotalProductQuantity(tsotalQuantity);
  };

  const onFinish = () => {
    const sizes = selectedColors.flatMap((colorId) =>
      selectedSizes[colorId]
        .filter((size: any) => size.quantity > 0)
        .map((size) => ({
          ...size,
          color_id: colorId.toString(),
        }))
    );
    const data = {
      product_id: product.id,
      sizes,
    };
    console.log(data);
    createData(data);
  };

  useEffect(() => {
    calculateTotalQuantities();
  }, [selectedSizes, selectedColors]);

  const resetStates = () => {
    setSelectedSizes(initialSizeState);
    setSelectedColors([]);
    setTotalQuantities({});
  };

  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>{product.discounted_price} uzs</span>
        <span className={styles.discount}>-{product.discount_percentage}%</span>
        <span className={styles.originalPrice}>{product.price} uzs</span>
      </div>
      {selectedColor !== null && (
        <div className={styles.sizeSelector}>
          {product.sizes.map((size, idx) => (
            <div key={idx} className={styles.size}>
              <span>{size.value}</span>
              <div className={styles.change_value}>
                <Button onClick={() => handleSizeChange(selectedColor, size.value, -1)}>
                  <Image src={MinusSvg} width={24} height={24} alt="#" />
                </Button>
                <h4>
                  {selectedSizes[selectedColor].find((s: any) => s.value === size.value)
                    ?.quantity || 0}
                </h4>
                <Button onClick={() => handleSizeChange(selectedColor, size.value, 1)}>
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.total}>
        <p>Итого</p>
        {/* <span>{Object.values(totalQuantities).reduce((sum, qty) => sum + qty, 0)} uzs</span> */}
      </div>
      <button className={styles.addToCart} onClick={onFinish}>
        В корзину
      </button>
    </div>
  );
};

export default ProductOrderSection;
