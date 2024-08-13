import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'adminLogin',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetEmail: (state, action: PayloadAction<string>) => {
            state.Email = action.payload
        },
        SetPassword: (state, action: PayloadAction<string>) => {
            state.Password = action.payload
        },
        SetLoadingLogin: (state, action: PayloadAction<boolean>) => {
            state.LoadingLogin = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetEmail,
    SetPassword,
    SetLoadingLogin
} = slice.actions

export const AdminLoginState = (state: RootState) => state.adminLogin
export default slice.reducer