import React from 'react';
import { OrderPage } from '@/features/Order';
import { useRouter } from 'next/router';

export default function Order() {
    const router = useRouter();

    const {id}  = router.query
    console.log(id);
    

    return (
        <div className='container'>
            <OrderPage orderId={id as string} />
        </div>
    );
}
