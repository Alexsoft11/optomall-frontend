import React, { FC, useEffect, useState } from "react";
import styles from "./ProductIsLike.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import { useJwt } from "@/utils/useJwt";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Product {
  id: string;
  img: string;
  title: string;
  price: number;
  provider: string;
  image: string;
  is_liked: boolean;
}

interface IProps {
  product: Product;
}

const ProductIsLike: FC<IProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState<boolean>(product.is_liked);
  const [isLoading, setIsLoading] = useState(false); // Prevents multiple clicks
  const user = useJwt();
  console.log(product)

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: "liked-product",
      method: "POST",
    },
    onSuccess: () => {
      setIsLoading(false); // Reset loading state after successful request
    },
    onError: (err) => {
      console.error(err);
      setIsLoading(false); // Reset loading state on error
    },
  });

  useEffect(() => {
    const likedProductsString = localStorage.getItem("likedProducts");
    if (likedProductsString) {
      const likedProducts: Product[] = JSON.parse(likedProductsString);
      setIsLiked(likedProducts.some((p) => p.id === product.id));
    }
  }, [product]);

  const handleClickLiked = () => {
    if (isLoading) return; // Prevent further actions while a request is in progress

    setIsLoading(true); // Set loading state to prevent double requests

    const likedProductsString = localStorage.getItem("likedProducts");
    let likedProducts: Product[] = likedProductsString ? JSON.parse(likedProductsString) : [];

    const index = likedProducts.findIndex((p) => p.id === product.id);

    if (isLiked) {
      if (index !== -1) {
        likedProducts.splice(index, 1);
      }

      if (user) {
        // Trigger the dislike API request
        dislikeCard([
          {
            product_id: product.id.toString(),
            title: product.title,
            price: product.price,
            provider: product.provider,
            image: product.image,
          },
        ]);
      } else {
        // Update localStorage and stop loading if there's no API call
        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
        setIsLoading(false);
      }
    } else {
      likedProducts.push(product);
      if (user) {
        // Trigger the like API request (this needs to be implemented separately)
        dislikeCard([
          {
            product_id: product.id.toString(),
            title: product.title,
            price: product.price,
            provider: product.provider,
            image: product.image,
          },
        ]);
      } else {
        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
        setIsLoading(false); // Stop loading if no API call was made
      }
    }

    setIsLiked(!isLiked); // Flip the liked state
  };

  return (
    <div>
      <button
        className={`${styles.liked} ${isLiked ? styles.active : ""}`}
        type="button"
        onClick={handleClickLiked}
        disabled={isLoading} // Disable the button while the request is in progress
      >
        <SvgSelector id="save-svg" />
      </button>
    </div>
  );
};

export default ProductIsLike;
