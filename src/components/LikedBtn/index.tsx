import React from 'react'
import SvgSelector from '$/assets/icons/SvgSelector'
import styles from './LikedBtn.module.scss'
import { CardInterface } from '@/interfaces';
import useQueryApiClient from '@/utils/useQueryApiClient';

interface LikedProps {
    product_id: string;
    id_filter?: number;
    isLike:boolean;
    onLikeChange?: (cardId: number, isLiked: boolean) => void;
}

const LikedBtn = ({ onLikeChange, product_id, isLike, id_filter }:LikedProps) => {
    
  const handleClickLiked = () => {
    if (onLikeChange && id_filter !== undefined) {
      onLikeChange(id_filter, !isLike);
    }
    dislikeCard([product_id]);
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
              isLike ? styles.active : ""
            }`}
            type="submit"
            onClick={() => handleClickLiked()}
        >
            <SvgSelector id="saved-svg" />
        </button>
    </div>
  )
}

export default LikedBtn