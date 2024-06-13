import { ProductImage } from "$/assets/images";
import { PurchasesOrderInterface } from "@/features/Purchases/interfaces";

export const PurchasesMockdata: PurchasesOrderInterface[] = [
    {
        id: 1,
        itemsCount: 10,
        cost: 10000,
        date: '01.04.1997',
        address: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        recipient: {
            name: 'Илхомов Юсуф',
            number: '+998946227645'
        },
        status: 'Processing',
        data: [
            {
                id: 1,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 2,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 3,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 4,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 5,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 6,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
        ]
    },
    {
        id: 2,
        itemsCount: 2,
        cost: 10000,
        date: '01.04.1997',
        address: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        recipient: {
            name: 'Abd',
            number: '+998946227645'
        },
        status: 'Delivered',
        data: [
            {
                id: 1,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 2,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
        ]
    },
    {
        id: 3,
        itemsCount: 2,
        cost: 10000,
        date: '01.04.1997',
        address: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        recipient: {
            name: 'Abd',
            number: '+998946227645'
        },
        status: 'Cancelled',
        data: [
            {
                id: 1,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 2,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
        ]
    },
    {
        id: 4,
        itemsCount: 2,
        cost: 10000,
        date: '01.04.1997',
        address: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        recipient: {
            name: 'Abd',
            number: '+998946227645'
        },
        status: 'Shipped',
        data: [
            {
                id: 1,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
            {
                id: 2,
                image: ProductImage,
                price: 200,
                title: 'Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet Lorem ipsum is dolor set amet vLorem ipsum is',
            },
        ]
    },
]