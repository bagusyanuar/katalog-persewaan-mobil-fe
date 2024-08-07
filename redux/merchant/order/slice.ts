import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'merchantOrder',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingOrder: (state, action: PayloadAction<boolean>) => {
            state.LoadingOrder = action.payload
        },
        SetID: (state, action: PayloadAction<number>) => {
            state.ID = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingOrder,
    SetID
} = slice.actions

export const MerchantOrderState = (state: RootState) => state.merchantOrder
export default slice.reducer