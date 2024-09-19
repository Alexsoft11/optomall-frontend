import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupedProperties,
  ProductDetailInterface,
  SKU,
  BasketInterface,
  CreateOrderItemsDataInterface,
  CreateOrderDataInterface,
  CreateBaskettemsDataInterface,
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
import { API } from "@/services/api";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [parsedSku, setParsedSku] = useState<SKU[]>([]);
  const [groupedProperties, setGroupedProperties] = useState<GroupedProperties>(
    {}
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [messageVisible, setMessageVisible] = useState(false);
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
      originalName?: string;
    }[]
  >();
  const [selectedSku, setSelectedSku] = useState<SKU[] | []>();
  const [currentSku, setCurrentSku] = useState<SKU>();
  const token = useJwt();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

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

      // Handle the promise using `.then()` since `onSuccess` cannot be async
      groupProperties(skus, prop_imgs, product.props_list)
        .then(({ parsedSku }) => {
          setSelectedSku([parsedSku[0]]);
          setCurrentSku(parsedSku[0]);
          if (res.order_group) {
            router.push(`/order/${res.order_group}`);
          }
        })
        .catch((error) => {
          console.error("Error in groupProperties:", error);
        });
    },
  });

  const handleCloseModal = () => {
    setOrderType(null);
  };

  useEffect(() => {
    const fetchGroupedProperties = async () => {
      if (skus && prop_imgs) {
        const { allProperties, imageProperties, parsedSku } =
          await groupProperties(skus, prop_imgs, product.props_list);

        const newSelectedPropertys = parsedSku[0].parsedProperties?.map(
          (el) => ({
            name: el.name,
            id: el.id,
          })
        );

        setSelectProperty(newSelectedPropertys);
        setCurrentSku(parsedSku[0]);
        setSelectedSku([parsedSku[0]]);
        setParsedSku(parsedSku);
        setGroupedProperties(allProperties);
        setPropertiesWithImages(imageProperties);
      }
    };

    fetchGroupedProperties();
  }, [skus, prop_imgs]);

  const getImageUrl = (propertys: string[]) => {
    let url = "";
    Object.values(propertiesWithImages).map(({ keys }) => {
      keys.map((el) => {
        if (propertys.includes(el.propId)) {
          url = el.imageUrl as string;
          return;
        }
      });
    });

    return url;
  };

  const toOrder = () => {
    const newSelectedSku = selectedSku?.filter(
      (el) => el.selected_quantity > 0
    );

    if (!newSelectedSku?.length) {
      if (!messageVisible) {
        setMessageVisible(true);
        messageApi.open({
          type: "warning",
          content: t("Cart.chooseItem"),
          onClose: () => setMessageVisible(false),
        });
      }
      return;
    }

    newSelectedSku?.map((el) => {
      if (
        product &&
        el.selected_quantity < product.quantityRanges[0].minQuantity
      ) {
        message.warning(
          `${t("Product-detail.isMinQuantity")} ${
            product.quantityRanges[0].minQuantity
          }`,
          5
        );
        return;
      }
    });

    const items: CreateBaskettemsDataInterface[] = newSelectedSku.map((el) => {
      const { id, title, product_url, image, seller_info } = product;

      let item: CreateBaskettemsDataInterface = {
        product_id: id,
        title: title,
        price: el.price,
        quantity: el.selected_quantity,
        image_url: getImageUrl(el.properties.split(";")) || image,
        product_url: product_url,
        seller_id: seller_info?.user_num_id?.toString(),
        provider: provider as string,
        sku_id: el.sku_id.toString(),
        properties: el.parsedProperties!,
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

  const handleSizeChange = (value: number) => {
    if (value < 0 || !currentSku?.quantity) return;

    if (currentSku?.quantity && value > currentSku.quantity) {
      message.warning(t("Product-detail.isMaxQuantity"), 5);
      return;
    }

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

  const getTotalPrice = () => {
    return selectedSku?.reduce(
      (acum, cur) => acum + cur.price * cur.selected_quantity,
      0
    );
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
                {getTotalPrice()} {t("GLOBAL.currency")}
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
              <Tooltip title={t("Product-detail.isMaxQuantity")}>
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
                {currentSku?.price} {t("GLOBAL.currency")}
              </h3>
            </div>
            <div className="property-items">
              {Object.values(propertiesWithImages).map(({ keys, propName }) => (
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
                    {keys.map(({ value, propId, imageUrl }, index) => (
                      <SwiperSlide key={propId}>
                        <Badge count={getPropertyQuantity(propId, propName)}>
                          <div
                            key={propId}
                            onClick={() =>
                              handlePropertySelect(propId, propName)
                            }
                            className={`img-block ${
                              currentSku?.properties.split(";").includes(propId)
                                ? styles.active
                                : !getExist(propId, parsedSku)
                                ? styles.disable
                                : ""
                            }`}
                          >
                            {imageUrl && (
                              <div
                                // onClick={() => {
                                //   const validImageUrls = keys
                                //     .map(({ imageUrl }) => imageUrl)
                                //     .filter((url): url is string => !!url); // Filters out undefined values
                                //   handleImageClick(validImageUrls, index);
                                // }}
                                className="img-box"
                              >
                                <span
                                  className="view-icon"
                                  onClick={() => {
                                    const validImageUrls = keys
                                      .map(({ imageUrl }) => imageUrl)
                                      .filter((url): url is string => !!url);
                                    handleImageClick(validImageUrls, index);
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
