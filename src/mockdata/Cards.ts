import { ProductImage, CategoryImg1, CategoryImg2, CategoryImg3 } from "$/assets/images";
import { CardCategoryInterface, CardInterface } from "@/interfaces";



export const CardsMockData: CardInterface[] = [
    {
        id:"1",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
    {
        id:"2",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
    {
        id:"3",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
    {
        id:"4",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
    {
        id:"5",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
    {
        id:"6",
        title: 'Lorem ipsum is dolor set amet',
        price: 'UZS 1650',
        image: ProductImage,
    },
]

export const CardsCategory: CardCategoryInterface[] = [
    {
        id: 1,
        title: 'Дом и сад',
        link: "/",
        imageUrl: CategoryImg3,
    },
    {
        id: 2,
        title: 'Сумки',
        link: "/",
        imageUrl: CategoryImg2,
    },
    {
        id: 3,
        title: 'Одежда',
        link: "/",
        imageUrl: CategoryImg1,
    },
    {
        id: 4,
        title: 'Смартфоны',
        link: "/",
        imageUrl: CategoryImg1,
    },
    {
        id: 5,
        title: 'Смартфоны',
        link: "/",
        imageUrl: CategoryImg1,
    },
]