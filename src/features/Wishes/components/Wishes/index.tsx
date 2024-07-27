import React, { useEffect, useState } from "react";
import styles from "./Wishes.module.scss";
import Card from "@/components/Card";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useJwt } from "@/utils/useJwt";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  wishesData?: CardInterface[];
}

const Wishes = ({ wishesData }: Props) => {
  const t = useTranslations("Wishes");
  const [data, setData] = useState<CardInterface[]>(wishesData || []);
  const savedData = typeof window !== 'undefined' ? localStorage.getItem('likedProducts') : null;
  const initialData: CardInterface[] = savedData ? JSON.parse(savedData) : [];
  
  const token = useJwt();

  const { appendData: dislikeCard } = useQueryApiClient({
    request: {
      url: 'liked-product',
      method: 'POST',
    },
    onSuccess(res) {
      localStorage.removeItem('likedProducts');
    },
  })
  
  useEffect(() => {
    if (!token) {
      const storedData = localStorage.getItem('likedProducts');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const updatedData = parsedData.map((item: CardInterface) => ({
          ...item,
          is_liked: true
        }));
        setData(updatedData);
      }
    }
  }, [token, wishesData]);

  const handleLikeChange = (cardId: number) => {
    if (token) {
      let clone = [...data];
      clone = clone.filter((el: any) => el.id !== cardId);
      setData(clone);

    } else {
      let localClone = [...initialData];
      localClone = localClone.filter((el: any) => el.id !== cardId);
      localStorage.setItem('likedProducts', JSON.stringify(localClone));
      setData(localClone);
    }
  };

  return (
    <div className={styles.wishes}>
      <div className="container">
        <div className={styles.wishes__inner}>
          <div className={styles.wishes__top}>
            <h2>{t('title')}</h2>
          </div>

          <div className={styles.wishes__cards}>
            {data &&
              data.map((item, idx) => (
                <Card
                  key={idx}
                  data={item}
                  onLikeChange={handleLikeChange}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishes;
