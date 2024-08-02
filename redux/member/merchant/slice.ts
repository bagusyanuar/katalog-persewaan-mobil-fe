import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'memberMerchant',
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

export const MemberMerchantState = (state: RootState) => state.memberMerchant
export default slice.reducer