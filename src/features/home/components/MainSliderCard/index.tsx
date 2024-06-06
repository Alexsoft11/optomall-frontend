import React from "react";
import Image from "next/image";
import styles from './MainSliderCard.module.scss'
import { MainSliderItemInterface } from "@/interfaces";

interface Props {
  el: MainSliderItemInterface;
}
const MainSliderCard = ({ el }: Props) => {

  return (
    <div className={styles.main_card}>
      <div className={styles.main_card__inner}>
        <Image
          className={styles.main_card__image}
          src={el.imageUrl}
          alt="#"
        />
      </div>
    </div>
  );
}

export default MainSliderCard;
