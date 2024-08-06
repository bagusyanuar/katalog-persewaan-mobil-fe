import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getProductList } from './action'
import { MerchantProduct } from "@/model/merchant";
import { Product } from "@/model/product";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getProductList.pending, (state) => {
        state.LoadingProduct = true
    }).addCase(getProductList.fulfilled, (state, { payload }) => {
        console.log(payload);
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: Product = {
                ID: v['id'],
                VehicleNumber: v['vehicle_number'],
                Name: v['name'],
                Price: v['price'],
                Image: `${ServerImage}${v['image']}`,
                Description: v['description'],
            }
            state.Products.push(element)
        })
        state.LoadingProduct = false
    }).addCase(getProductList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingProduct = false
        state.Products = []
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetProduct(builder);
}

export default extraReducers