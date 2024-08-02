import { Merchant, MerchantProduct } from "@/model/merchant"

export type TState = {
    Merchant: Merchant | null
    MerchantProducts: Array<MerchantProduct>
    LoadingMerchant: boolean
}

const initialState: TState = {
    Merchant: null,
    MerchantProducts: [],
    LoadingMerchant: true
}

export default initialState