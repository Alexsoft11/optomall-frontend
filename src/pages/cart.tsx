import { CartOrderPage } from '@/features/Cart';
import { useRouter } from 'next/router';

import React from 'react';

export default function Cart() {
    const route = useRouter()
    return (
        <div>
            {route.query.step === 'order'? <CartOrderPage /> : null}
            {route.query.step === 'cart'? <CartOrderPage /> : null}
            
        </div>
    );
}
