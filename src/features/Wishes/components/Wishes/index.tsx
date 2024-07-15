import React, { useEffect, useState } from "react";
import styles from "./Wishes.module.scss";
import Card from "@/components/Card";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";

interface Props {
  wishesData?: CardInterface[];
}

const Wishes = ({ wishesData }: Props) => {
  const t = useTranslations("Wishes")
  const [data, setData] = useState<any>(wishesData);

  const handleLikeChange = (cardId: number, isLiked: boolean) => { 
    let clone = [...data]
    clone = clone.filter((el: any) => el.id !== cardId && !isLiked)
    setData(clone);
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
              data.map((item: any, idx: number) => (
                <Card
                  key={idx}
                  data={item}
                  isShowLiked={true}
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
