import { Cart } from "@/model/cart"
import { RentModel } from "@/model/rent"

export type TState = {
    Rent: RentModel | null
    Rents: Array<RentModel>
    LoadingRent: boolean
    LoadingPayment: boolean
}

const initialState: TState = {
    Rent: null,
    Rents: [],
    LoadingRent: true,
    LoadingPayment: false,
}

export default initialState