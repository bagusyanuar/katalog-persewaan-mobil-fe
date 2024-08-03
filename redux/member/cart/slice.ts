import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'memberCart',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingAddToCart: (state, action: PayloadAction<boolean>) => {
            state.LoadingAddToCart = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingAddToCart
} = slice.actions

export const MemberCartState = (state: RootState) => state.memberCart
export default slice.reducer