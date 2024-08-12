import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupedProperties,
  ProductDetailInterface,
  SKU,
  BasketInterface,
} from "../../interface";
import { Button, Modal } from "@/ui";
import { groupProperties } from "@/utils/orderFunctions";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { MinusSvg, PlusSvg } from "$/assets/images";
import styles from "./ProductOrderModal.module.scss";
import { Button as AntdButton, message, Tooltip, Badge } from "antd";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";

interface Props {
  product?: ProductDetailInterface;
  setOrderType?: any;
  type?: "to_order" | "to_cart" | null;
}

const ProductOrderModal = ({ product, setOrderType, type }: Props) => {
  const t = useTranslations();
  const { skus, prop_imgs } = product || {};
  const router = useRouter();
  const { provider } = router.query; // Extract provider from the query

  const [parsedSku, setParsedSku] = useState<SKU[]>([]);
  const [groupedProperties, setGroupedProperties] = useState<GroupedProperties>(
    {}
  );
  const [propertiesWithImages, setPropertiesWithImages] = useState<{
    [key: string]: {
      keys: { value: string; imageUrl?: string }[];
      propName: string;
    };
  }>({});

  // State for selected properties and basket
  const [selectedProperties, setSelectedProperties] = useState<{
    [propId: string]: string;
  }>({});
  const [basket, setBasket] = useState<BasketInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // Default quantity is 1

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
    },
  });

  const handleCloseModal = () => {
    setOrderType(null);
  };

  useEffect(() => {
    if (skus && prop_imgs) {
      const { allProperties, imageProperties, parsedSku } = groupProperties(
        skus,
        prop_imgs
      );
      setParsedSku(parsedSku);
      setGroupedProperties(allProperties);
      setPropertiesWithImages(imageProperties);

      // Automatically select the first property with an image URL
      const defaultImageProperty = Object.values(imageProperties)[0];
      if (defaultImageProperty) {
        const defaultImageValue = defaultImageProperty.keys[0].value;
        setSelectedProperties({
          [defaultImageProperty.propName]: defaultImageValue,
        });
        setSelectedQuantity(1); // Set initial quantity to 1
      }
    }
  }, [skus, prop_imgs]);

  // Update total price whenever the basket changes
  useEffect(() => {
    const total = basket.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [basket]);

  const handlePropertySelect = (propId: string, value: string) => {
    setSelectedProperties((prevSelected) => ({
      ...prevSelected,
      [propId]: value,
    }));

    // Update the selected quantity based on the SKU
    const sku = parsedSku.find((sku) =>
      sku?.parsedProperties?.every(
        (prop) =>
          selectedProperties[prop.id] === prop.value || prop.value === value
      )
    );

    if (sku) {
      const basketItem = basket.find((item) => item.sku_id === sku.sku_id);
      setSelectedQuantity(basketItem ? basketItem.quantity : 1);
    }
  };

  const handleAddToBasket = () => {
    const sku = parsedSku.find((sku) =>
      sku?.parsedProperties?.every(
        (prop) => selectedProperties[prop.id] === prop.value
      )
    );

    if (!sku) {
      message.error("SKU not found for selected properties");
      return;
    }

    const basketItem: BasketInterface = {
      product_id: product?.id,
      title: product?.title,
      price: product?.price,
      color: selectedProperties["color"], // Assuming you have a 'color' property
      quantity: selectedQuantity, // Use the selected quantity
      max_quantity: product?.quantity || 10,
      size: selectedProperties["size"], // Assuming you have a 'size' property
      image_url:
        propertiesWithImages["color"]?.keys.find(
          (key) => key.value === selectedProperties["color"]
        )?.imageUrl || "",
      product_url: product?.product_url,
      seller_id: product?.seller_id,
      provider: provider as string, // Use provider from router query
      sku_id: sku.sku_id,
    };

    setBasket((prevBasket) => {
      const existingIndex = prevBasket.findIndex(
        (item) => item.sku_id === basketItem.sku_id
      );

      if (existingIndex > -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingIndex].quantity += selectedQuantity; // Increment quantity if already in basket
        return updatedBasket;
      } else {
        return [...prevBasket, basketItem];
      }
    });
  };

  const handleQuantityChange = (type: string) => {
    setSelectedQuantity((prevQuantity) => {
      if (type === "incr") {
        return prevQuantity + 1;
      } else if (type === "decr" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const getPropertyQuantity = (propId: string, value: string) => {
    return basket.reduce((acc, item) => {
      const sku = parsedSku.find((sku) => sku.sku_id === item.sku_id);
      if (
        sku &&
        sku?.parsedProperties?.some(
          (prop) => prop.id === propId && prop.value === value
        )
      ) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);
  };

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div>
      <Modal
        className="order-modal"
        onCancel={handleCloseModal}
        open={!!type}
        footer={
          <div className="modal-footer">
            <div key={1} className={styles.change_value}>
              <AntdButton onClick={() => handleQuantityChange("decr")}>
                <Image src={MinusSvg} width={24} height={24} alt="#" />
              </AntdButton>
              <Tooltip title={`Max quantity`}>
                <h4 className={styles.selected_quantity}>
                  <Badge count={selectedQuantity}>{selectedQuantity}</Badge>
                </h4>
              </Tooltip>
              <Tooltip>
                <AntdButton onClick={() => handleQuantityChange("incr")}>
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </AntdButton>
              </Tooltip>
            </div>
            <Button
              className={styles.addToCart}
              size="large"
              label={t(type)}
              type="primary"
              onClick={handleAddToBasket}
            />
          </div>
        }
      >
        <div className="order-modal-body">
          <div className="top"></div>
          <div className="content">
            <div className="property-items">
              {Object.values(propertiesWithImages).map(({ keys, propName }) => (
                <div className="content-inner" key={propName}>
                  <h2>{capitalize(propName)}</h2>
                  <Swiper
                    slidesPerView={6}
                    breakpoints={{
                      960: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                      },
                      460: {
                        slidesPerView: 5.2,
                        spaceBetween: 10,
                      },
                      350: {
                        slidesPerView: 5,
                        spaceBetween: 5,
                      },
                    }}
                    loop={true}
                    spaceBetween={5}
                  >
                    {keys.map(({ value, imageUrl }) => (
                      <SwiperSlide
                        key={value}
                        onClick={() => handlePropertySelect(propName, value)}
                        className={
                          selectedProperties[propName] === value
                            ? styles.active
                            : ""
                        }
                      >
                        {imageUrl && (
                          <div className="img-box">
                            <Image src={imageUrl} alt={value} fill />
                          </div>
                        )}
                        <Badge count={getPropertyQuantity(propName, value)}>
                          <p>{value}</p>
                        </Badge>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
              {Object.entries(groupedProperties).map(([propName, { keys }]) => (
                <div className="content-inner grouped-prop" key={propName}>
                  <h2>{capitalize(propName)}</h2>
                  <div className="items">
                    {keys.map(({ value }) => (
                      <Badge
                        count={getPropertyQuantity(propName, value)}
                        key={value}
                      >
                        <p
                          onClick={() => handlePropertySelect(propName, value)}
                          className={
                            selectedProperties[propName] === value
                              ? styles.active
                              : ""
                          }
                        >
                          {value}
                        </p>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductOrderModal;
