import { Cart } from "@/model/cart"

export type TState = {
    Cart: Cart | null
    Carts: Array<Cart>
    LoadingCart: boolean
    LoadingAddToCart: boolean
    LoadingCheckout: boolean
}

const initialState: TState = {
    Cart: null,
    Carts: [],
    LoadingCart: true,
    LoadingAddToCart: false,
    LoadingCheckout: false,
}

export default initialState