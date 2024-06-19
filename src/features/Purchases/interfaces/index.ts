import { StaticImageData } from "next/image"

export interface PurchasesItemInterface {
    id: number,
    image: StaticImageData,
    price: number,
    title: string
}

export interface PurchasesUserInterface {
    name: string,
    number: string
}

export interface PurchasesOrderInterface {
    id: number,
    itemsCount: number,
    cost: number,
    date: string,
    address: string,
    recipient: PurchasesUserInterface,
    status: string,
    data: PurchasesItemInterface[]
}