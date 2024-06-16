import React from "react";
import Image from "next/image";
import styles from './MainSliderCard.module.scss'
import { SlidersDataInterface } from "@/interfaces";

interface Props {
  el: SlidersDataInterface;
}
const MainSliderCard = ({ el }: Props) => {
  return (
    <div className={styles.main_card}>
      <div className={styles.main_card__inner}>
        <Image
          className={styles.main_card__image}
          src={el.image}
          width={1000}
          height={1000}
          alt="#"
        />
      </div>
    </div>
  );
}

export default MainSliderCard;
