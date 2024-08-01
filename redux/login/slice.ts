import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'

const slice = createSlice({
    name: 'login',
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
    // extraReducers: eventReducers,
})

export const {
    Reset,
    SetEmail,
    SetPassword,
    SetLoadingLogin
} = slice.actions

export const LoginState = (state: RootState) => state.login
export default slice.reducer