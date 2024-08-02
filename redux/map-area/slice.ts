import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import initialState from './state'
import eventReducers from './event'

const slice = createSlice({
    name: 'mapArea',
    initialState,
    reducers: {
        Reset: () => initialState,
        SetLoadingMap: (state, action: PayloadAction<boolean>) => {
            state.LoadingMap = action.payload
        },
    },
    extraReducers: eventReducers,
})

export const {
    Reset,
    SetLoadingMap
} = slice.actions

export const MapAreaState = (state: RootState) => state.mapArea
export default slice.reducer