import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getMerchantProduct } from './action'
import { MerchantProduct } from "@/model/merchant";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetMerchant = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getMerchantProduct.pending, (state) => {
        state.LoadingMerchant = true
    }).addCase(getMerchantProduct.fulfilled, (state, { payload }) => {
        console.log(payload);
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: MerchantProduct = {
                ID: v['id'],
                MerchantID: v['merchant_id'],
                VehicleNumber: v['vehicle_number'],
                Name: v['name'],
                Price: v['price'],
                Image: `${ServerImage}${v['image']}`,
                Description: v['description'],
            }
            state.MerchantProducts.push(element)
        })
        state.LoadingMerchant = false
    }).addCase(getMerchantProduct.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingMerchant = false
        state.MerchantProducts = []
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetMerchant(builder);
}

export default extraReducers