import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'merchantDriver',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetID: (state, action: PayloadAction<number>) => {
            state.ID = action.payload
        },
        SetName: (state, action: PayloadAction<string>) => {
            state.Name = action.payload
        },
        SetPrice: (state, action: PayloadAction<number>) => {
            state.Price = action.payload
        },
        SetPhone: (state, action: PayloadAction<string>) => {
            state.Phone = action.payload
        },
        SetLoadingDriver: (state, action: PayloadAction<boolean>) => {
            state.LoadingDriver = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetID,
    SetName,
    SetPhone,
    SetPrice,
    SetLoadingDriver
} = slice.actions

export const MerchantDriverState = (state: RootState) => state.merchantDriver
export default slice.reducer