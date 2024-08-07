import { MerchantDriver } from "@/model/driver"

export type TState = {
    ID: number
    Name: string
    Price: number
    Image: string
    Phone: string
    Driver: MerchantDriver | null
    Drivers: Array<MerchantDriver>
    LoadingDriver: boolean
    LoadingSaveDriver: boolean
}

const initialState: TState = {
    ID: 0,
    Name: '',
    Price: 0,
    Image: '',
    Phone: '',
    Driver: null,
    Drivers: [],
    LoadingDriver: true,
    LoadingSaveDriver: false
}

export default initialState