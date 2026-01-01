import PageLayout from "@/components/Layout/PageLayout";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Shop from "@/features/ProductDetail/Components/Shop";
import { useTranslations } from "next-intl";

const ShopPage = () => {
  const { query } = useRouter();
  const t = useTranslations("Product-detail");

  const sellerId = useMemo(() => {
    return query.id ? String(query.id) : "";
  }, [query.id]);

  return (
    <PageLayout metaTitle={t("shop_info")}>
       <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
          <Shop sellerId={sellerId} autoLoadProducts={true} />
       </div>
    </PageLayout>
  );
};

export default ShopPage;
