import React from "react";
import styles from "./CargoPage.module.scss";
import CargoCheque from "../CargoCheque";
import { useRouter } from "next/router";
import { CargoDataInterface } from "../../interfaces";
import OrderBlock from "@/components/OrderBlock";

interface Props {
  cargoData: CargoDataInterface;
}

export default function OrderPage({ cargoData }: Props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.main}>
      <CargoCheque
        cardId={cargoData.card_number}
        cost={cargoData.total_price}
      />
      <OrderBlock
        orderId={+id!}
        cargoCost={cargoData.kg_price}
        type="cargo"
        cost={cargoData.total_price}
      />
    </div>
  );
}
