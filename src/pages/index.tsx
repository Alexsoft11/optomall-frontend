import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";
import cookie from "cookie";
import { useJwt } from "@/utils/useJwt";
import useQueryApiClient from "@/utils/useQueryApiClient";

const MainSlider = dynamic(
  () => import("@/features/home/components/MainSlider"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const Products = dynamic(() => import("@/features/home/components/Products"), {
  loading: () => <LoadingSpinner fullscreen={true} size="large" />,
});

interface HomeProps {
  slidersData: { sliders: any[] };
  productsData: { products: any[] };
  categoryProductsData: { categories: any[] };
}

export default function Home({
  slidersData,
  productsData,
  categoryProductsData,
}: HomeProps) {
  const t = useTranslations("Home");
  const [isLoading, setIsLoading] = useState(true);
  const token = useJwt();
  const hasPosted = useRef(false);
  const [products, setProducts] = useState(productsData.products);
  const [categories, setCategories] = useState(categoryProductsData.categories);

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: "liked-product",
      method: "POST",
    },
    onSuccess() {
      localStorage.removeItem("likedProducts");
      window.location.reload();
    },
  });

  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem("likedProducts")
      : null;

  useEffect(() => {
    if (token && !hasPosted.current) {
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          const likedProductIds = categories
          .flatMap((category) => 
            category.products
              .filter((product: any) => product.is_liked)
              .map((product: any) => product.id.toString())
          );

          const filteredCards = parsedData.filter((item: any) => {
            return !likedProductIds.includes(item.id.toString());
          });

          const likedProductsFilter = filteredCards.map((item: any) => item.id.toString());

          if (likedProductsFilter.length > 0) {
            dislikeCard(likedProductsFilter);
            hasPosted.current = true;
          }
        }
      }
    }
  }, [token, dislikeCard, savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullscreen={true} size="large" />;
  }

  return (
    <PageLayout
      metaTitle={t("metaTitle")}
      metaDescription={t("metaDescription")}
      metaKeywords={t("metaKeywords")}
    >
      <MainSlider data={slidersData?.sliders} />
      <Products products={products} categoryData={categories} />
    </PageLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const slidersResponse = await API.getHomePageSlider();
    const productsResponse = await API.getHomePageProducts();
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = cookies.token ? decodeURIComponent(cookies.token) : null;

    let categoryProductsResponse;

    if (token) {
      categoryProductsResponse = await API.getHomePageCategoryProductsToken(
        token
      );
    } else {
      categoryProductsResponse = await API.getHomePageCategoryProducts();
    }

    return {
      props: {
        slidersData: slidersResponse.data || { sliders: [] },
        categoryProductsData: categoryProductsResponse.data || {
          categories: [],
        },
        productsData: productsResponse.data || { products: [] },
        messages: (await import(`../translate/${context.locale}.json`)).default,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        slidersData: { sliders: [] },
        productsData: { products: [] },
        categoryProductsData: { categories: [] },
        messages: (await import(`../translate/${context.locale}.json`)).default,
      },
    };
  }
};
