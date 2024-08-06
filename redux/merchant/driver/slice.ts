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
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingProduct
} = slice.actions

export const MerchantProductState = (state: RootState) => state.memberMerchant
export default slice.reducer