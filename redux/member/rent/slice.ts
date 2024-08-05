import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'memberRent',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingRent: (state, action: PayloadAction<boolean>) => {
            state.LoadingRent = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingRent
} = slice.actions

export const MemberRentState = (state: RootState) => state.memberRent
export default slice.reducer