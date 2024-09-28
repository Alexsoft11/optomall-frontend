import React, { useEffect, useState } from 'react'
import SvgSelector from '$/assets/icons/SvgSelector'
import styles from './LikedBtn.module.scss'
import { CardInterface } from '@/interfaces';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { useJwt } from '@/utils/useJwt';

interface LikedProps {
  card: CardInterface;
  product_id: string;
  id_filter?: number;
  isLike: boolean;
  onLikeChange?: (cardId: number) => void;
}

const LikedBtn = ({ onLikeChange, product_id, isLike, id_filter, card }: LikedProps) => {
  const token = useJwt();
  const [changeLike, setChangeLike] = useState(isLike);

  useEffect(() => {
    if (!token) {
      const likedProductsString = localStorage.getItem('likedProducts');
      if (likedProductsString) {
        const likedProducts = JSON.parse(likedProductsString);
        setChangeLike(likedProducts.some((p: any) => p.id === card.id));
      }
    }
  }, [card]);

  const handleClickLiked = () => {
    const likedProductsString = localStorage.getItem('likedProducts');
    const likedProducts = likedProductsString ? JSON.parse(likedProductsString) : [];
    if (changeLike) {
      if (onLikeChange && id_filter !== undefined) {
        onLikeChange(id_filter);
      }
      if (!token && !onLikeChange) {
        const updatedLikedProducts = likedProducts
          .map((el: any) => ({ ...el, product_id: el.id }))
          .filter((el: any) => el.id !== card.id);
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
      }
      if (token) {
        if (onLikeChange) {
          // dislikeCard([card.product_id.toString()])
          dislikeCard([
            {
              product_id: card.product_id.toString(),
              title: card.title,
              price: card.price,
              provider: card.provider,
              image: card.image
            }
          ]);
        } else {
          dislikeCard([
            {
              product_id: card.id.toString(),
              title: card.title,
              price: card.price,
              provider: card.provider,
              image: card.image
            }
          ])
        }
      }

      if (!onLikeChange) {
        setChangeLike(false);
      }
    } else {
      setChangeLike(true);
      if (token) {
        dislikeCard([
          {
            product_id: card.id.toString(),
            title: card.title,
            price: card.price,
            provider: card.provider,
            image: card.image
          }
        ]);
      } else {
        likedProducts.push({ ...card, product_id: card.id });
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
      }
    }
  };

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: 'liked-product',
      method: 'POST',
    },
  })

  return (
    <div>
      <button
        className={`${styles.liked} ${changeLike ? styles.active : ""
          }`}
        type="submit"
        onClick={() => handleClickLiked()}
      >
        <SvgSelector id="save-svg" />
      </button>
    </div>
  )
}

export default LikedBtn