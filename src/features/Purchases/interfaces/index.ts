
export interface PurchasesItemInterface {
    id: number,
    order_id: number,
    image_url: string,
    price: number,
    title: string
}

export interface PurchasesOrderInterface {
    id: number,
    itemsCount: number,
    total_price: number,
    user_name: string,
    user_phone: string,
    created_at: string,
    location_url: string,
    location_name: string,
    status: string,
    items: PurchasesItemInterface[]
}