import React, { FC, useEffect, useState } from 'react';
import styles from './ProductIsLike.module.scss';
import SvgSelector from '$/assets/icons/SvgSelector';
import { useJwt } from '@/utils/useJwt';
import useQueryApiClient from '@/utils/useQueryApiClient';


interface Product {
  id: string;
  img: string;
  title: string;
  price: number;
  is_liked: boolean; // Добавлено свойство is_like для управления состоянием лайка
}

interface IProps {
  product: Product; // Объект товара для сохранения в localStorage
}

const ProductIsLike: FC<IProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState<boolean>(product.is_liked); // Используем is_like из product для инициализации состояния
  const user = useJwt(); // Подставьте хук для получения текущего пользователя
  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: 'liked-product',
      method: 'POST',
    },
   
  })

  useEffect(() => {
    // Проверяем начальное состояние лайка из localStorage при монтировании компонента
    const likedProductsString = localStorage.getItem('likedProducts');
    if (likedProductsString) {
      const likedProducts: Product[] = JSON.parse(likedProductsString);
      setIsLiked(likedProducts.some(p => p.id === product.id));
    }
  }, [product]);

  const handleClickLiked = () => {
    setIsLiked(prevLiked => {
      // Получаем текущий массив из localStorage
      const likedProductsString = localStorage.getItem('likedProducts');
      let likedProducts: Product[] = [];
      if (likedProductsString) {
        likedProducts = JSON.parse(likedProductsString);
      }

      // Проверяем, есть ли уже такой товар в лайках
      const index = likedProducts.findIndex(p => p.id === product.id);

      // Обновляем массив в зависимости от текущего состояния
      if (prevLiked) {
        // Удаляем товар из массива
        if (index !== -1) {
          likedProducts.splice(index, 1);
        }
        if (user) {
          // Отправляем запрос на сервер для дизлайка товара с указанием product_id
          dislikeCard([product.id.toString()]);
        } else {
          // Сохраняем обновленный массив в localStorage
          localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        }
      } else {
        // Добавляем товар в массив
        likedProducts.push(product);
        if (user) {
          // Отправляем запрос на сервер для лайка товара с указанием product_id
          // Здесь должен быть ваш запрос для лайка товара на сервере
        } else {
          // Сохраняем обновленный массив в localStorage
          localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        }
      }

      return !prevLiked;
    });
  };

  return (
    <div>
      <button
        className={`${styles.liked} ${isLiked ? styles.active : ''}`}
        type="button"
        onClick={handleClickLiked}
      >
        <SvgSelector id="save-svg" />
      </button>
    </div>
  );
};

export default ProductIsLike;
