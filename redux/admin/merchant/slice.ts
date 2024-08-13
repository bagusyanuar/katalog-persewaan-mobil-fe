import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'adminMerchant',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingMerchant: (state, action: PayloadAction<boolean>) => {
            state.LoadingMerchant = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingMerchant
} = slice.actions

export const AdminMerchantState = (state: RootState) => state.adminMerchant
export default slice.reducer