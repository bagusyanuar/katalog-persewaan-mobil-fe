import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'memberProfile',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetEmail: (state, action: PayloadAction<string>) => {
            state.Email = action.payload
        },
        SetUsername: (state, action: PayloadAction<string>) => {
            state.Username = action.payload
        },
        SetPassword: (state, action: PayloadAction<string>) => {
            state.Password = action.payload
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
        SetLoadingSave: (state, action: PayloadAction<boolean>) => {
            state.LoadingSaveProfile = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetUsername,
    SetEmail,
    SetPassword,
    SetName,
    SetPhone,
    SetAddress
} = slice.actions

export const MemberProfileState = (state: RootState) => state.memberProfile
export default slice.reducer