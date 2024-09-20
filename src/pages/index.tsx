import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";
import cookie from "cookie";
import { useJwt } from "@/utils/useJwt";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { CardInterface } from "@/interfaces";
import { useRouter } from "next/router";
import Products from "@/features/home/components/Products";
import useSearchStore from "@/components/useSearchStore";

const MainSlider = dynamic(
  () => import("@/features/home/components/MainSlider"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const ProductsSection = dynamic(
  () => import("@/features/home/components/Products"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

interface HomeProps {
  slidersData: { sliders: any[] };
}

export default function Home({ slidersData }: HomeProps) {
  const t = useTranslations("Home");
  const [isLoading, setIsLoading] = useState(true);
  const token = useJwt();
  const isEntered = typeof window !== "undefined" ? sessionStorage.getItem("isEnter") : null;

  const hasPosted = useRef(false);
  const {
    products,
    setProducts,
  } = useSearchStore();

  const [categories, setCategories] = useState<any>([]);
  const [limit, setLimit] = useState(15);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('scrollData');
    }
  }, []);

  const { appendData: getCategories, isLoading: isCategoriesLoading } =
    useQueryApiClient({
      request: {
        url: `additional-categories${token && token !== "undefined" ? "-token" : ""
          }?limit=${limit}`,
        method: "GET",
      },
      onSuccess(res: any) {
        setCategories(res.categories);
      },
    });

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: "liked-product",
      method: "POST",
    },
    onSuccess() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("likedProducts");
        window.location.reload();
      }
    },
  });

  const { appendData: getProductsData, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `products?lang=${router.locale}`,
        method: "GET",
        disableOnMount: true
      },
      onSuccess(res: any) {
        setProducts(res.products);
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
        const localStorageData = parsedData.map((item: CardInterface) => ({
          ...item,
          is_liked: true,
        }));

        if (Array.isArray(localStorageData)) {
          if (localStorageData.length && categories.length > 0) {
            const filteredData = localStorageData.filter((updatedItem) => {
              const categoryProduct = categories.flatMap((category: any) =>
                category.products.filter(
                  (item: any) => item.id == updatedItem.id
                )
              );

              if (categoryProduct.length > 0) {
                return categoryProduct.some(
                  (item: any) => updatedItem.is_liked !== item.is_liked
                );
              } else {
                return true;
              }
            });

            const likedProductsFilter = filteredData.map(
              (item: CardInterface) => item.id.toString()
            );

            if (likedProductsFilter.length > 0) {
              dislikeCard(likedProductsFilter);
              hasPosted.current = true;
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dislikeCard, savedData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isEntered) {
        getProductsData({ query: "discount" });
      } else {
        sessionStorage.removeItem("isEnter");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 650) {
        setLimit(3);
      } else if (window.innerWidth <= 768) {
        setLimit(3);
      } else if (window.innerWidth > 768) {
        setLimit(15);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

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
      <Products
        productsData={products}
        getProductsData={getProductsData}
        isProductsLoading={isProductsLoading}
        categoryData={categories}
      />
    </PageLayout>
  );
}


export const getServerSideProps = async (context: any) => {
  try {

    const slidersResponse = await API.getHomePageSlider();


    return {
      props: {
        slidersData: slidersResponse.data || { sliders: [] },
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        slidersData: { sliders: [] },
      },
    };
  }
};
