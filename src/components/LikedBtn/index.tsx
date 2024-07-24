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
  onLikeChange?: (cardId: number, isLiked: boolean) => void;
}

const LikedBtn = ({ onLikeChange, product_id, isLike, id_filter, card }:LikedProps) => {
  const token = useJwt()
  let likedProducts = [];
  const [changeLike, setChangeLike] = useState(isLike);

  useEffect(() => {
    const likedProductsString = localStorage.getItem('likedProducts');
    if (likedProductsString) {
      const likedProducts = JSON.parse(likedProductsString);
      setChangeLike(likedProducts.some((p: any) => p.id === card.id));
    }
  }, [card]);

  const handleClickLiked = () => {
    if (changeLike) {
      if (onLikeChange && id_filter !== undefined) {
        onLikeChange(id_filter, !isLike);
      }
      if (!token && !onLikeChange) {
        let localClone: any[] = [];
        localClone = localClone.filter((el: any) => el.id !== id_filter);
        localStorage.setItem('likedProducts', JSON.stringify(localClone));
      }
      setChangeLike(false)
    } else {
      setChangeLike(!isLike)
      if (token) {
        dislikeCard([card.id.toString()])
      } else {
        likedProducts.push(card);
        if (token) {
  
        } else {
          localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        }
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