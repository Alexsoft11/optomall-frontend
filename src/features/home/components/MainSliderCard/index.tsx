import React from "react";
import Image from "next/image";
import styles from "./MainSliderCard.module.scss";
import { SlidersDataInterface } from "@/interfaces";
import Link from "next/link";

interface Props {
  el: SlidersDataInterface;
}
const MainSliderCard = ({ el }: Props) => {
  return (
    <Link target="_blank" href={el.url} className={styles.main_card}>
      <div className={styles.main_card__inner}>
        <Image
          className={styles.main_card__image}
          src={window.innerWidth <= 600 ? el?.image_mobile : el?.image}
          width={10000}
          height={10000}
          alt="#"
        />
      </div>
    </Link>
  );
};

export default MainSliderCard;
