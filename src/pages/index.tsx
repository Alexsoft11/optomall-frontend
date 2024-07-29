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
}

export default function Home({
  slidersData,
  productsData,
}: HomeProps) {
  const t = useTranslations("Home");
  const [isLoading, setIsLoading] = useState(true);
  const token = useJwt();
  const hasPosted = useRef(false);
  const [products, setProducts] = useState(productsData.products);
  const [categories, setCategories] = useState<any>([]);
  const [limit, setLimit] = useState(15);

  const { appendData: getCategories, isLoading: isCategoriesLoading } = useQueryApiClient({
    request: {
      url: `additional-categories${token && token !== "undefined" ? "-token" : ""}?limit=${limit}`,
      method: 'GET',
    },
    onSuccess(res: any) {
      setCategories(res.categories);
    }
  });

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
        const updatedData = parsedData.map((item: CardInterface) => ({
          ...item,
          is_liked: true
        }));

        if (Array.isArray(updatedData)) {

          if (updatedData.length) {

            const likedProductsFilter = updatedData.map((item: CardInterface) => item.id.toString());
  
            if (likedProductsFilter.length > 0) {
              dislikeCard(likedProductsFilter);
              hasPosted.current = true;
            }
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

  // Следим за изменением limit и вызываем getCategories при каждом изменении
  useEffect(() => {
    getCategories();
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
      <Products products={products} categoryData={categories} />
    </PageLayout>
  );
}



export const getServerSideProps = async (context: any) => {
  try {
    const slidersResponse = await API.getHomePageSlider();
    const productsResponse = await API.getHomePageProducts();
    
    return {
      props: {
        slidersData: slidersResponse.data || { sliders: [] },
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
