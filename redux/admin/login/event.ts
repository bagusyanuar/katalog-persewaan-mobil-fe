import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { submit } from './action'

const onSubmitEvent = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(submit.pending, (state) => {
        state.LoadingLogin = true
    }).addCase(submit.fulfilled, (state, { payload }) => {
        state.LoadingLogin = false
    }).addCase(submit.rejected, (state, { payload }) => {
        state.LoadingLogin = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onSubmitEvent(builder);
}

export default extraReducers