import { StaticImageData } from "next/image";

export interface CartOrderItemInterface {
    id: number,
    image: StaticImageData,
    title: string,
    color: string,
    size: string,
    cost: number,
    count: number
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

