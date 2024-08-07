import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { submit } from './action'
import { MerchantProduct } from "@/model/merchant";
import { Product } from "@/model/product";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onSubmit = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(submit.pending, (state) => {
        state.LoadingRegister = true
    }).addCase(submit.fulfilled, (state, { payload }) => {
        state.LoadingRegister = false
    }).addCase(submit.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingRegister = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onSubmit(builder);
}

export default extraReducers