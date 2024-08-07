import { Order } from "@/model/order"

export type TState = {
    ID: number
    Order: Order | null
    Orders: Array<Order>
    ConfirmReason: string
    LoadingOrder: boolean
    LoadingConfirmOrder: boolean

}

const initialState: TState = {
    ID: 0,
    Order: null,
    Orders: [],
    ConfirmReason: '',
    LoadingOrder: true,
    LoadingConfirmOrder: false,
}

export default initialState