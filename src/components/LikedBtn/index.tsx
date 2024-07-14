import React from 'react'
import SvgSelector from '$/assets/icons/SvgSelector'
import styles from './LikedBtn.module.scss'
import { CardInterface } from '@/interfaces';
import useQueryApiClient from '@/utils/useQueryApiClient';

interface LikedProps {
    data: CardInterface;
    onLikeChange?: (cardId: number, isLiked: boolean) => void;
}

const LikedBtn = ({ onLikeChange, data }:LikedProps) => {
    
  const handleClickLiked = () => {
    if (onLikeChange) {
      onLikeChange(+data.id, !data.is_liked);
    }
    dislikeCard([data.product_id]);
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
                data.is_liked ? styles.active : ""
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