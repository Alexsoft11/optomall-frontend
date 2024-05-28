/** @format */

import React from "react";
import { CardInterface } from "@/interfaces";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  data: CardInterface;
  idx: number;
  path?: string;
}

const Card = ({ data, idx, path = "#",}: CardProps) => {
  return (
    <>
      <Link href={path} key={idx}>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <Image src={data.imageUrl} alt='img' />
          </div>

          <h2 className={styles.card__title}>{data.title}</h2>

          <p className={styles.card__price}>{data.price}</p>
        </div>
      </Link>
    </>
  );
};

export default Card;
