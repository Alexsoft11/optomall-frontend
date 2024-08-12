import React, { useEffect, useState } from "react";
import {
  GroupedProperties,
  ProductDetailInterface,
  PropImage,
  SKU,
} from "../../interface";
import { Button, Modal } from "@/ui";

import { groupProperties } from "@/utils/orderFunctions";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { MinusSvg, PlusSvg } from "$/assets/images";
import styles from "./ProductOrderModal.module.scss";
import { Button as AntdButton, message, Tooltip } from "antd";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  product?: ProductDetailInterface;
  setOrderType?: any;
  type?: "to_order" | "to_cart" | null;
}

const ProductOrderModal = ({ product, setOrderType, type }: Props) => {
  const { skus, prop_imgs } = product || {};
  const [groupedProperties, setGroupedProperties] =
    useState<GroupedProperties>();
  const [propertiesWithImages, setPropertiesWithImages] =
    useState<GroupedProperties>({});

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: `user-basket`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      // handleResetBasket();
    },
  });

  const handleCloseModal = () => {
    setOrderType(null);
  };

  useEffect(() => {
    if (skus && prop_imgs) {
      const { allProperties, imageProperties } = groupProperties(
        skus,
        prop_imgs
      );
      setGroupedProperties(allProperties);
      setPropertiesWithImages(imageProperties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skus, prop_imgs]);

  const handleSizeChange = (type: string) => {};

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div>
      <Modal
        className="order-modal"
        onCancel={handleCloseModal}
        open={!!type}
        footer={[
          <div key={1} className={styles.change_value}>
            <AntdButton onClick={() => handleSizeChange("decr")}>
              <Image src={MinusSvg} width={24} height={24} alt="#" />
            </AntdButton>
            <Tooltip title={`Max quantity`}>
              <h4 className={styles.selected_quantity}>
                {/* {quantity ? quantity.quantity : 0} */}
              </h4>
            </Tooltip>
            <Tooltip>
              <AntdButton onClick={() => handleSizeChange("incr")}>
                <Image src={PlusSvg} width={24} height={24} alt="#" />
              </AntdButton>
            </Tooltip>
          </div>,
        ]}
      >
        <div className="order-modal-body">
          <div className="top"></div>
          <div className="content">
            {propertiesWithImages &&
              Object.values(propertiesWithImages).map(({ keys, propName }) => (
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
                      <SwiperSlide key={value}>
                        {imageUrl && (
                          <div className="img-box">
                            <Image src={imageUrl} alt={value} fill />
                          </div>
                        )}
                        <p>{value}</p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductOrderModal;
