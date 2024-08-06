import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { submit } from './action'

const onSubmitEvent = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(submit.pending, (state) => {
        state.LoadingLogout = true
    }).addCase(submit.fulfilled, (state, { payload }) => {
        state.LoadingLogout = false
    }).addCase(submit.rejected, (state, { payload }) => {
        state.LoadingLogout = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onSubmitEvent(builder);
}

export default extraReducers