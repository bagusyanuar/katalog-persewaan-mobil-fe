import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'

const slice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetEmail: (state, action: PayloadAction<string>) => {
            state.Email = action.payload
        },
        SetPassword: (state, action: PayloadAction<string>) => {
            state.Password = action.payload
        },
        SetUsername: (state, action: PayloadAction<string>) => {
            state.Username = action.payload
        },
        SetName: (state, action: PayloadAction<string>) => {
            state.Name = action.payload
        },
        SetPhone: (state, action: PayloadAction<string>) => {
            state.Phone = action.payload
        },
        SetAddress: (state, action: PayloadAction<string>) => {
            state.Address = action.payload
        },
        SetLoadingRegister: (state, action: PayloadAction<boolean>) => {
            state.LoadingRegister = action.payload
        },
    },
    // extraReducers: eventReducers,
})

export const {
    Reset,
    SetEmail,
    SetPassword,
    SetUsername,
    SetName,
    SetPhone,
    SetAddress,
    SetLoadingRegister
} = slice.actions

export const RegisterState = (state: RootState) => state.register
export default slice.reducer