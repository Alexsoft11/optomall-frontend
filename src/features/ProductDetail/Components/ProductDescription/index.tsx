import React, { FC } from "react";

import styles from "./ProductDescription.module.scss";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import { LoadingSpinner } from "@/ui/Spin";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";

const ProductDescription = ({ descImages = [] }: { descImages?: string[] }) => {
  const { query, locale } = useRouter();

  const { data: description, isLoading } = useQueryApiClient({
    request: {
      url: `product-detail-desc?productId=${query.id}&lang=${locale}&provider=${query.provider}`,
      method: "GET",
      disableOnMount: descImages.length > 0,
    },
  });

  console.log('desc', description.desc?.detail_html);


  return (
    <>
      {descImages.length > 0 ? (
        <div className={styles.desc_images_local}>
          {descImages.map((el, idx) => (
            // <Image key={idx} src={el} alt="img" referrerPolicy="no-referrer" />
            <CustomImage
              src={el}
              alt="Product Image"
              className={styles.detail_image}
              imgClass={styles.img}
              isLink={false}
              loading="lazy"
              key={idx}
            />
          ))}
        </div>
      ) : isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <div
          className={styles.html_img}
          dangerouslySetInnerHTML={{
            __html: description?.desc?.detail_html,
          }}
        />
      )}
    </>
  );
};

export default ProductDescription;
