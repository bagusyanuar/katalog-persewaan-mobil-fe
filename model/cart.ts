import { Driver } from "./driver"

export type CartRequest = {
    ProductID: number
}


export type CheckoutRequest = {
    DateReturn: String
    RentDay: number
    Drivers: Array<number>
}

export type Cart = {
    ID: number
    ProductID: number
    ProductName: string
    ProductImage: string
    ProductPrice: number
    ProductDescription: string
}