import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { addToCart, checkout } from './action'

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onAddToCart = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(addToCart.pending, (state) => {
        state.LoadingAddToCart = true
    }).addCase(addToCart.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.LoadingAddToCart = false
    }).addCase(addToCart.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingAddToCart = false
    })
}

const onCheckoutEvent = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(checkout.pending, (state) => {
        state.LoadingCheckout = true
    }).addCase(checkout.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.LoadingCheckout = false
    }).addCase(checkout.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingCheckout = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onAddToCart(builder);
    onCheckoutEvent(builder);
}

export default extraReducers