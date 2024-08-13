import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'adminMember',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingMember: (state, action: PayloadAction<boolean>) => {
            state.LoadingMember = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingMember
} = slice.actions

export const AdminMemberState = (state: RootState) => state.adminMember
export default slice.reducer