import { Cart } from "@/model/cart"
import { RentModel } from "@/model/rent"

export type TState = {
    Rent: RentModel | null
    Rents: Array<RentModel>
    LoadingRent: boolean
}

const initialState: TState = {
    Rent: null,
    Rents: [],
    LoadingRent: true,
}

export default initialState