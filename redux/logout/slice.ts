import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingLogout: (state, action: PayloadAction<boolean>) => {
            state.LoadingLogout = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingLogout
} = slice.actions

export const LogoutState = (state: RootState) => state.logout
export default slice.reducer