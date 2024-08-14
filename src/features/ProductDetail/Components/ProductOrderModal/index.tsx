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
import { log } from "console";

interface Props {
  product: ProductDetailInterface;
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
      keys: { value: string; imageUrl?: string; propId: string }[];
      propName: string;
    };
  }>({});

  const [selectProperty, setSelectProperty] = useState<
    {
      name: string;
      id: string;
    }[]
  >();
  const [basket, setBasket] = useState<BasketInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedSku, setSelectedSku] = useState<SKU[] | []>();
  const [currentSku, setCurrentSku] = useState<SKU>();

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
      const newSelectedPropertys = parsedSku[0].parsedProperties?.map((el) => ({
        name: el.name,
        id: el.id,
      }));
      setSelectProperty(newSelectedPropertys);
      setCurrentSku(parsedSku[0]);
      setSelectedSku([parsedSku[0]]);
      setParsedSku(parsedSku);
      setGroupedProperties(allProperties);
      setPropertiesWithImages(imageProperties);
    }
  }, [skus, prop_imgs]);

  useEffect(() => {
    const total = basket.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [basket]);

  useEffect(() => {}, []);

  // Old function for sku
  const handleSizeChange = (value: number) => {
    if (value < 0) return;

    if (!currentSku) return;

    if (!selectedSku) {
      const newCurrentSku = { ...currentSku, selected_quantity: value };
      setSelectedSku([newCurrentSku]);
      return;
    }

    if (!selectedSku.find((el) => el.sku_id === currentSku.sku_id)) {
      const clone = selectedSku.map((el) => el);
      clone.push({ ...currentSku, selected_quantity: value });
      setSelectedSku(clone);
      return;
    }

    const clone = selectedSku.map((el) => {
      if (el.sku_id === currentSku.sku_id) {
        const newCurrentSku = {
          ...currentSku,
          selected_quantity: value,
        };
        setCurrentSku(newCurrentSku);

        return { ...el, selected_quantity: value };
      } else return el;
    });
    setSelectedSku(clone);
  };

  const handlePropertySelect = (propId: string, name: string) => {
    let isFind = false;

    let copy = Object.assign(
      selectProperty || [{ name: name, id: propId }],
      []
    );

    copy.forEach((el) => {
      if (el.name === name) {
        isFind = true;
        el.id = propId;
      }
    });

    !isFind ? copy.push({ name: name, id: propId }) : null;

    parsedSku.map((el) => {
      let counter = 0;
      const properyIdArr = el.properties.split(";");
      const selectIdArr = copy?.map((el) => el.id) || [];

      for (const index of properyIdArr) {
        selectIdArr.includes(index) ? counter++ : null;
      }

      if (counter === properyIdArr.length) {
        const isFind = selectedSku?.find((item) => el.sku_id === item.sku_id);
        setCurrentSku(isFind || el);
      }
    });

    setSelectProperty(copy);
  };

  const getPropertyQuantity = (propId: string, name: string) => {
    if (!selectedSku) return;

    let quantity = 0;
    for (const item of selectedSku) {
      if (item.properties.split(";").includes(propId)) {
        quantity += item.selected_quantity;
      }
    }

    return quantity;
  };

  const getExist = (propId: string, arr: SKU[]) => {
    let flag = false;
    arr.map((el) => {
      el.parsedProperties!.map((item) => {
        item.id === propId ? (flag = true) : null;
      });
    });
    return flag;
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
              <AntdButton
                onClick={() =>
                  handleSizeChange(currentSku!.selected_quantity - 1)
                }
              >
                <Image src={MinusSvg} width={24} height={24} alt="#" />
              </AntdButton>
              <Tooltip title={`Max quantity`}>
                <h4 className={styles.selected_quantity}>
                  {currentSku?.selected_quantity}
                </h4>
              </Tooltip>
              <Tooltip>
                <AntdButton
                  onClick={() =>
                    handleSizeChange(++currentSku!.selected_quantity)
                  }
                >
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </AntdButton>
              </Tooltip>
            </div>
            <Button
              className={styles.addToCart}
              size="large"
              label={t(type)}
              type="primary"
              // onClick={handleAddToBasket}
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
                    {keys.map(({ value, propId, imageUrl }) => (
                      <SwiperSlide
                        key={value}
                        onClick={() => handlePropertySelect(propId, propName)}
                        className={
                          currentSku?.properties.split(";").includes(propId)
                            ? styles.active
                            : !getExist(propId, parsedSku)
                            ? styles.disable
                            : ""
                        }
                      >
                        {imageUrl && (
                          <div className="img-box">
                            <Image src={imageUrl} alt={value} fill />
                          </div>
                        )}
                        <Badge count={getPropertyQuantity(propId, propName)}>
                          <p>{value}</p>
                        </Badge>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
              {Object.entries(groupedProperties).map(
                ([propName, { keys }], idx) => (
                  <div className="content-inner grouped-prop" key={propName}>
                    <h2>{capitalize(propName)}</h2>
                    <div className="items">
                      {keys.map(({ value, propId }) => (
                        <Badge
                          count={
                            idx !== 0
                              ? null
                              : !Object.values(propertiesWithImages).length
                              ? getPropertyQuantity(propId, propName)
                              : null
                          }
                          key={value}
                        >
                          <p
                            onClick={() =>
                              handlePropertySelect(propId, propName)
                            }
                            className={
                              currentSku?.properties.split(";").includes(propId)
                                ? styles.active
                                : !getExist(propId, parsedSku)
                                ? styles.disable
                                : ""
                            }
                          >
                            {value}
                          </p>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductOrderModal;
