import { StaticImageData } from "next/image";

export interface CartOrderItemInterface {
    product_id: number,
    image_url: StaticImageData | null,
    title: string,
    color: string,
    size: string | null,
    price: number,
    quantity: number
}

export interface CartOrderDataInterface {
    itemsCount: number,
    date: string,
    data: CartOrderItemInterface[]
}

export interface CartOrderInterface {
    count: number,
    itemsValue: number,
}


