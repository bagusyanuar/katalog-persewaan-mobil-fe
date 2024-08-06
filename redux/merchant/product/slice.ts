import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'merchantProduct',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingProduct: (state, action: PayloadAction<boolean>) => {
            state.LoadingProduct = action.payload
        },
        SetVehicleNumber: (state, action: PayloadAction<string>) => {
            state.VehicleNumber = action.payload
        },
        SetName: (state, action: PayloadAction<string>) => {
            state.Name = action.payload
        },
        SetPrice: (state, action: PayloadAction<number>) => {
            state.Price = action.payload
        },
        SetDescription: (state, action: PayloadAction<string>) => {
            state.Description = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetName,
    SetVehicleNumber,
    SetPrice,
    SetDescription,
    SetLoadingProduct
} = slice.actions

export const MerchantProductState = (state: RootState) => state.merchantProduct
export default slice.reducer