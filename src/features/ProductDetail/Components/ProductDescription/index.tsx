import React, { FC } from "react";

import styles from "./ProductDescription.module.scss";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import { LoadingSpinner } from "@/ui/Spin";

const ProductDescription = () => {
  const { query, locale } = useRouter();

  const { data: description, isLoading } = useQueryApiClient({
    request: {
      url: `product-detail-desc?productId=${query.id}&lang=${locale}&provider=${query.provider}`,
      method: "GET",
    },
  });

  return (
    <>
      {isLoading ? (
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
