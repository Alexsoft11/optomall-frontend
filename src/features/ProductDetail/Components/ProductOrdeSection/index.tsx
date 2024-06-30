import React, { useEffect, useState } from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button } from "antd";
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
}

interface SelectedSizes {
  [colorId: number]: {
    id: number;
    quantity: number;
  }[];
}

const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({ product, selectedColor, selectedColors, setTotalQuantities }) => {
  const { appendData: createData } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: 'POST',
      disableOnMount: true,
    },
    onSuccess(res) {
      console.log(res);
    },
  });

  const initialSizeState = product.colors.reduce((acc: SelectedSizes, color: Color) => {
    acc[color.id] = product.sizes.map(size => ({ id: size.id, quantity: 0 }));
    return acc;
  }, {});

  const [selectedSizes, setSelectedSizes] = useState<SelectedSizes>(initialSizeState);

  const handleSizeChange = (colorId: number, sizeId: number, increment: number) => {
    setSelectedSizes((prev: SelectedSizes) => {
      const newSizes = { ...prev };
      const sizeIndex = newSizes[colorId].findIndex(size => size.id === sizeId);
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
    for (const colorId in selectedSizes) {
      if (selectedColors.includes(Number(colorId))) { // Проверяем, выбран ли цвет
        totals[colorId] = selectedSizes[colorId].reduce(
          (sum: number, size: any) => sum + size.quantity,
          0
        );
      }
    }
    setTotalQuantities(totals);
  };

  const onFinish = () => {
    if (selectedColors.length === 0) {
      alert("Please select at least one color.");
      return;
    }

    const sizes = selectedColors.flatMap(colorId => 
      selectedSizes[colorId].filter((size: any) => size.quantity > 0)
    );

    const data = {
      product_id: product.id,
      sizes: sizes,
      colors: selectedColors,
    };
    createData(data);
  };

  useEffect(() => {
    calculateTotalQuantities();
  }, [selectedSizes, selectedColors]);

  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>{product.discounted_price} uzs</span>
        <span className={styles.discount}>-{product.discount_percentage}%</span>
        <span className={styles.originalPrice}>{product.price} uzs</span>
      </div>
      {selectedColor !== null && (
        <div className={styles.sizeSelector}>
          {product.sizes.map(size => (
            <div key={size.id} className={styles.size}>
              <span>{size.value}</span>
              <div className={styles.change_value}>
                <Button onClick={() => handleSizeChange(selectedColor, size.id, -1)}>
                  <Image src={MinusSvg} width={24} height={24} alt='#' />
                </Button>
                <h4>{selectedSizes[selectedColor].find((s: any) => s.id === size.id)?.quantity || 0}</h4>
                <Button onClick={() => handleSizeChange(selectedColor, size.id, 1)}>
                  <Image src={PlusSvg} width={24} height={24} alt='#' />
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
      <button className={styles.addToCart} onClick={onFinish}>В корзину</button>
    </div>
  );
};

export default ProductOrderSection;