import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupedProperties,
  ProductDetailInterface,
  BasketInterface,
  CreateOrderItemsDataInterface,
  CreateOrderDataInterface,
  CreateBaskettemsDataInterface,
  AllDataInterface,
  ConfiguratorInterface,
  ConfiguredItem,
  ConfiguratorItemInterface,
} from "../../interface";
import { Button, Modal } from "@/ui";
import { groupProperties } from "@/utils/orderFunctions";
import Image from "next/image";
import { MinusSvg, PlusSvg, SearchSvg } from "$/assets/images";
import styles from "./ProductOrderModal.module.scss";
import { Button as AntdButton, Tooltip, Badge, message } from "antd";
import Lightbox from "react-awesome-lightbox";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { useJwt } from "@/utils/useJwt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SvgSelector from "$/assets/icons/SvgSelector";
import { formatPrice } from "@/constants";

interface Props {
  product: ProductDetailInterface;
  setOrderType?: any;
  type?: "to_order" | "to_cart" | null;
}

const ProductOrderModal = ({ product, setOrderType, type }: Props) => {
  const t = useTranslations();
  const { attributes, configuredItems } = product || {};

  const router = useRouter();
  const { provider } = router.query; // Extract provider from the query
  const [showModal, setShowModal] = useState<boolean>(false);
  const [groupedProperties, setGroupedProperties] = useState<AllDataInterface>(
    {}
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [messageVisible, setMessageVisible] = useState(false);

  const [selectProperty, setSelectProperty] = useState<
    {
      name: string;
      value?: string;
      imageUrl?: string;
      Vid: string;
      Pid: string;
    }[]
  >();
  const [selectedSku, setSelectedSku] = useState<ConfiguredItem[]>();
  const [currentSku, setCurrentSku] = useState<ConfiguredItem>();
  const token = useJwt();
  const [configuredItemsArr, setConfiguredItemsArr] =
    useState<ConfiguredItem[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [propertiesWithImages, setPropertiesWithImages] =
    useState<GroupedProperties>();
  const handleImageClick = (images: string[], index: number) => {
    setCurrentImages(images);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const { appendData: createUserBasket } = useQueryApiClient({
    request: {
      url: type && type === "to_cart" ? `user-basket` : "orders",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Product-detail.${res.message}`), 2);
      const { ConfiguredItems } = groupProperties(attributes, configuredItems);
      setSelectedSku([ConfiguredItems[0]]);
      setCurrentSku(ConfiguredItems[0]);
      res.order_group ? router.push(`/order/${res.order_group}`) : null;
    },
  });

  const handleCloseModal = () => setOrderType(null);

  useEffect(() => {
    if (attributes && configuredItems) {
      const { allProperties, ConfiguredItems, imageProperties } =
        groupProperties(attributes, configuredItems);
      let initialItem = ConfiguredItems[0];

      setConfiguredItemsArr(ConfiguredItems);
      setPropertiesWithImages(imageProperties);
      setCurrentSku(initialItem);
      setSelectProperty(initialItem.configurators);
      setSelectedSku([initialItem]);
      setGroupedProperties(allProperties);
    }
  }, [attributes]);

  //function to get a link to an image
  // const getImageUrl = (propertys: string[]) => {
  //   let url = "";
  //   Object.values(propertiesWithImages).map(({ keys }) => {
  //     keys.map((el) => {
  //       if (propertys.includes(el.propId)) {
  //         url = el.imageUrl as string;
  //         return;
  //       }
  //     });
  //   });

  //   return url;
  // };

  //function create request data to buy or add to cart
  const toOrder = () => {
    const newSelectedSku = selectedSku?.filter(
      (el) => el.selected_quantity > 0
    );
    if (!newSelectedSku?.length) {
      if (!messageVisible) {
        setMessageVisible(true);
        messageApi.open({
          type: "success",
          content: t("Cart.chooseItem"),
          onClose: () => setMessageVisible(false),
          duration: 100,
        });
      }
      return;
    }
    const items: CreateBaskettemsDataInterface[] = newSelectedSku.map((el) => {
      let imageUrl = "";
      const newConfig = el.configurators.map((el) => {
        if (el.imageUrl) imageUrl = el.imageUrl;
        return {
          name: el.name,
          value: el.value,
          id: `${el.Pid};${el.Vid}`,
        };
      });

      const { id, title, product_url, image, seller_info } = product;
      let item: CreateBaskettemsDataInterface = {
        product_id: id.toString(),
        title: title,
        price: el.price,
        quantity: el.selected_quantity,
        image_url: imageUrl || image,
        product_url: product_url,
        seller_id: seller_info?.user_num_id?.toString() || "default",
        provider: provider as string,
        sku_id: el.id,
        properties: newConfig,
      };
      if (type === "to_cart") item.max_quantity = el.quantity;
      return item;
    });
    if (!token) {
      setShowModal(true);
      return;
    }
    if (type === "to_order") {
      const data: CreateOrderDataInterface = {
        items: items,
        total_price: getTotalPrice() as number,
      };

      createUserBasket(data);
      return;
    }

    createUserBasket(items);
  };

  const modalProps = {
    onCancel: () => setShowModal(false),
    className: "bg_white",
    img: SearchSvg,
    description: t("Cart.authMessage"),
    children: (
      <Button
        onClick={() =>
          router.push(`/auth?step=signin&backUrl=${router.asPath}`)
        }
        className="signIn_btn"
        label={t("Cart.signin")}
      />
    ),
    open: showModal,
  };
  //change quantity and add/remove from selectedSku if quantity >1/<=0
  const handleSizeChange = (value: number) => {
    if (!selectedSku) return;
    if (
      value < 0 ||
      (currentSku?.quantity && value > currentSku?.quantity) ||
      !currentSku?.quantity
    )
      return;
    if (!currentSku) return;

    const newCurrentSku = {
      ...currentSku,
      selected_quantity: value,
    };
    setCurrentSku(newCurrentSku);

    if (!selectedSku.find((el) => el.id === currentSku.id)) {
      const clone = selectedSku.map((el) => el);
      clone.push({
        ...currentSku,
        selected_quantity: value,
      });
      setSelectedSku(clone);
      return;
    }

    const clone = selectedSku.map((el) => {
      if (el.id === currentSku.id) {
        return { ...el, selected_quantity: value };
      } else return el;
    });

    setSelectedSku(clone);
  };

  //function select item`s property and get combination property`s id to find sku_id
  const handlePropertySelect = (
    Pid: string,
    Vid: string,
    name: string,
    value: string,
    imageUrl?: string
  ) => {
    let isFind = false;

    let copy = [
      ...(selectProperty || [
        imageUrl
          ? {
              name: name,
              Pid: Pid,
              Vid: Vid,
              value: value,
              imageUrl: imageUrl,
            }
          : { name: name, Pid: Pid, Vid: Vid, value: value },
      ]),
    ];

    copy = copy.map((el) => {
      if (el.name === name) {
        isFind = true;
        const data = imageUrl
          ? {
              name: name,
              Pid: Pid,
              Vid: Vid,
              value: value,
              imageUrl: imageUrl,
            }
          : { name: name, Pid: Pid, Vid: Vid, value: value };

        return data;
      } else return el;
    });

    !isFind
      ? copy.push(
          imageUrl
            ? {
                name: name,
                Pid: Pid,
                Vid: Vid,
                value: value,
                imageUrl: imageUrl,
              }
            : { name: name, Pid: Pid, Vid: Vid, value: value }
        )
      : null;

    configuredItemsArr?.map((el) => {
      let element = Object.assign(el, {});
      let imagesProperty: ConfiguratorItemInterface[] = [];
      if (propertiesWithImages) {
        Object.values(propertiesWithImages).map((images) => {
          const property = images.keys.map((el) => ({
            ...el,
            name: images.propName,
          }));
          imagesProperty = property.concat(imagesProperty);
        });

        element.configurators = el.configurators.map((config) => {
          return config;
        });
      }

      element.configurators = element.configurators.map((item) => {
        let newConfig: ConfiguratorItemInterface = item;
        for (const config of imagesProperty) {
          config.Pid === item.Pid && config.Vid === item.Vid
            ? (newConfig = config)
            : null;
        }
        return newConfig;
      });

      let counter = 0;

      element.configurators.map((item) => {
        copy.map((selectedItem) => {
          if (selectedItem.Pid === item.Pid && selectedItem.Vid === item.Vid) {
            counter += 1;
          }
        });
      });

      if (counter === element.configurators.length) {
        const foundItem = selectedSku?.find(
          (item) => item.id === element.id
        ) || {
          ...element,
          selected_quantity: 0,
        };

        setCurrentSku(foundItem);
      }
    });

    setSelectProperty(copy);
  };

  //get property quantity from data and sum it
  const getPropertyQuantity = (Pid: string, Vid: string, name: string) => {
    if (!selectedSku) return;

    let quantity = 0;
    for (const item of selectedSku) {
      item.configurators.map((el) => {
        if (el.Pid === Pid && el.Vid === Vid && el.name === name) {
          quantity += item.selected_quantity;
        }
      });
    }
    return quantity;
  };

  //function to check is item exist
  const getExist = (Pid: string, Vid: string) => {
    if (!configuredItemsArr) return;
    for (const configs of configuredItemsArr) {
      if (configs.quantity <= 0) return false;
      for (const item of configs.configurators) {
        if (Pid === item.Pid && Vid === item.Vid) {
          return true;
        }
      }
    }
    return false;
  };

  const isSelect = (Pid: string, Vid: string, name: string) => {
    return selectProperty?.find(
      (el) => el.Pid === Pid && el.Vid === Vid && el.name === name
    );
  };

  //sum all selectedSku`s items price
  const getTotalPrice = () => {
    const total = selectedSku?.reduce(
      (acum, cur) => acum + cur.price * cur.selected_quantity,
      0
    );
    return total;
  };

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <div>
      {contextHolder}
      <Modal
        className="order-modal"
        onCancel={handleCloseModal}
        open={!!type}
        footer={
          <div className="modal-footer">
            <div className="totalPrice">
              <h3>
                {formatPrice(getTotalPrice())} {t("GLOBAL.currency")}
              </h3>
            </div>
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
                    handleSizeChange(currentSku!.selected_quantity + 1)
                  }
                >
                  <Image src={PlusSvg} width={24} height={24} alt="#" />
                </AntdButton>
              </Tooltip>
            </div>
            <Button
              className={styles.addToCart}
              size="large"
              label={
                type === "to_cart"
                  ? t("Product-detail.addToCart")
                  : t("Product-detail.buy")
              }
              type="primary"
              onClick={toOrder}
            />
          </div>
        }
      >
        <div className="order-modal-body">
          <div className="top"></div>
          <div className="content">
            <div className="currentPrice">
              <h3>
                {formatPrice(currentSku?.price)} {t("GLOBAL.currency")}
              </h3>
            </div>
            <div className="property-items">
              {!propertiesWithImages
                ? null
                : Object.values(propertiesWithImages)?.map(
                    ({ keys, propName }) => (
                      <div className="content-inner" key={propName}>
                        <h2>{capitalize(propName)}</h2>
                        <Swiper
                          spaceBetween={20}
                          slidesPerView={1.1}
                          loop={true}
                          modules={[Navigation]}
                          breakpoints={{
                            1000: {
                              slidesPerView: 8,
                            },
                            960: {
                              slidesPerView: 6,
                            },
                            480: {
                              slidesPerView: 5,
                            },
                            380: {
                              slidesPerView: 1.3,
                            },
                          }}
                          pagination={{ clickable: true }}
                        >
                          {keys.map(({ value, Pid, Vid, imageUrl }, index) => (
                            <SwiperSlide key={Pid}>
                              <Badge
                                count={getPropertyQuantity(Pid, Vid, propName)}
                              >
                                <div
                                  key={Pid}
                                  onClick={() =>
                                    handlePropertySelect(
                                      Pid,
                                      Vid,
                                      propName,
                                      value,
                                      imageUrl
                                    )
                                  }
                                  className={`img-block ${
                                    getExist(Pid, Vid)
                                      ? isSelect(Pid, Vid, propName)
                                        ? styles.active
                                        : ""
                                      : styles.disable
                                  }`}
                                >
                                  {imageUrl && (
                                    <div className="img-box">
                                      <span
                                        className="view-icon"
                                        onClick={() => {
                                          const validImageUrls = keys
                                            .map(({ imageUrl }) => imageUrl)
                                            .filter(
                                              (url): url is string => !!url
                                            );
                                          handleImageClick(
                                            validImageUrls,
                                            index
                                          );
                                        }}
                                      >
                                        <SvgSelector id="open-image-view-svg" />
                                      </span>
                                      <Image src={imageUrl} alt={value} fill />
                                    </div>
                                  )}
                                  <div className="img-describtion">
                                    <p>{value}</p>
                                  </div>
                                </div>
                              </Badge>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )
                  )}
            </div>
            <div className="property-items">
              {Object.entries(groupedProperties).map(
                ([propName, keys], idx) => (
                  <div className="content-inner grouped-prop" key={propName}>
                    <h2>{capitalize(propName)}</h2>
                    <div className="items">
                      {keys.map(({ value, pid, vid }, index) => (
                        <Badge
                          count={
                            idx === 0 && !propertiesWithImages
                              ? getPropertyQuantity(pid, vid, propName)
                              : null
                          }
                          key={value}
                        >
                          <p
                            onClick={() =>
                              handlePropertySelect(pid, vid, propName, value)
                            }
                            className={
                              getExist(pid, vid)
                                ? isSelect(pid, vid, propName)
                                  ? styles.active
                                  : ""
                                : styles.disable
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
      <Modal {...modalProps} />

      {isOpen && (
        <Lightbox
          images={currentImages.map((img) => ({ url: img }))}
          onClose={() => setIsOpen(false)}
          startIndex={photoIndex} // Starting index for the lightbox
          doubleClickZoom={2} // Zoom level on double-click
        />
      )}
    </div>
  );
};

export default ProductOrderModal;
