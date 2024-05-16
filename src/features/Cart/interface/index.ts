import { StaticImageData } from "next/image";

export interface CartOrderItemInterface {
    id: number,
    image: StaticImageData,
}

export interface CartOrderDataInterface {
    itemsCount: number,
    date: string,
    data: CartOrderItemInterface[]
}

export interface CartOrderInterface {
    count: number,
    itemsValue: number
}

