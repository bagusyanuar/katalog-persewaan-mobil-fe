import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'merchatRegister',
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
        SetLatitude: (state, action: PayloadAction<string>) => {
            state.Latitude = action.payload
        },
        SetLongitude: (state, action: PayloadAction<string>) => {
            state.Longitude = action.payload
        },
        SetLoadingRegister: (state, action: PayloadAction<boolean>) => {
            state.LoadingRegister = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetEmail,
    SetPassword,
    SetUsername,
    SetName,
    SetPhone,
    SetAddress,
    SetLatitude,
    SetLongitude,
    SetLoadingRegister
} = slice.actions

export const MerchantRegisterState = (state: RootState) => state.merchantRegister
export default slice.reducer