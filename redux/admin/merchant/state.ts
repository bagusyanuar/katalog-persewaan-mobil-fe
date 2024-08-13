import { AdminMerchant } from "@/model/merchant"

export type TState = {
    Merchants: Array<AdminMerchant>
    LoadingMerchant: boolean
}

const initialState: TState = {
    Merchants: [],
    LoadingMerchant: false
}

export default initialState