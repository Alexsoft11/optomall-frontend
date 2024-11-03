import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MainSliderCard.module.scss";
import { SlidersDataInterface } from "@/interfaces";
import Link from "next/link";

interface Props {
  el: SlidersDataInterface;
}

const MainSliderCard = ({ el }: Props) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    // <Link target="_blank" href={el?.url ? el?.url : ''} className={styles.main_card}>
    <div className={styles.main_card__inner}>
      {windowWidth !== null && (
        <Image
          className={styles.main_card__image}
          src={windowWidth <= 600 ? el?.image_mobile : el?.image}
          width={1000}
          height={1000}
          alt="#"
        />
      )}
    </div>
    // </Link>
  );
};

export default MainSliderCard;
