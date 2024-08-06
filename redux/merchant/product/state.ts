import { Product } from "@/model/product"

export type TState = {
    ID: number
    VehicleNumber: string
    Name: string
    Price: number
    Image: string
    Description: string
    Product: Product | null
    Products: Array<Product>
    LoadingProduct: boolean
    LoadingSaveProduct: boolean
}

const initialState: TState = {
    ID: 0,
    VehicleNumber: '',
    Name: '',
    Price: 0,
    Image: '',
    Description: '',
    Product: null,
    Products: [],
    LoadingProduct: true,
    LoadingSaveProduct: false
}

export default initialState