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

const LikedBtn = ({ onLikeChange, product_id, isLike, id_filter, card }:LikedProps) => {
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
        const updatedLikedProducts = likedProducts.filter((el: any) => el.id !== card.id);
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
      }
      if (token) {
        if (onLikeChange) {
          dislikeCard([card.product_id.toString()])
          setChangeLike(true);
        } else {
          dislikeCard([card.id.toString()])
        }
      }
      setChangeLike(false);
    } else {
      setChangeLike(true);
      if (token) {
        dislikeCard([card.id.toString()]);
      } else {
        likedProducts.push(card);
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
      }
    }
  };

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: 'liked-product',
      method: 'POST',
    },
    onSuccess(res) {
    },
  })

  return (
    <div>
        <button
            className={`${styles.liked} ${
              changeLike ? styles.active : ""
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