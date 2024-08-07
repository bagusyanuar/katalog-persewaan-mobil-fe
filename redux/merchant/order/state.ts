import { Order } from "@/model/order"

export type TState = {
    ID: number
    Order: Order | null
    Orders: Array<Order>
    LoadingOrder: boolean
}

const initialState: TState = {
    ID: 0,
    Order: null,
    Orders: [],
    LoadingOrder: true,
}

export default initialState