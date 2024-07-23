import React from 'react';
import styles from './CargoPage.module.scss';
import CargoCheque from '../CargoCheque';
import { CartOrderBlock } from '@/features/Cart';
import { useRouter } from 'next/router';
import { CargoDataInterface } from '../../interfaces';

interface Props {
    cargoData: CargoDataInterface;
}

export default function OrderPage({ cargoData }: Props) {
    const router = useRouter()
    const { id } = router.query 
    return (
        <div className={styles.main}>
            <CargoCheque cardId={cargoData.card_number} cost={cargoData.total_price} />
            <CartOrderBlock orderId={+id!} cargoCost={5} type="cargo" cost={`${cargoData.total_price} $`} />
        </div>
    );
}
