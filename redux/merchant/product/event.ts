import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getProductList, createProduct, patchProduct, deleteProduct } from './action'
import { MerchantProduct } from "@/model/merchant";
import { Product } from "@/model/product";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getProductList.pending, (state) => {
        state.LoadingProduct = true
    }).addCase(getProductList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Products = []
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

const onCreateProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(createProduct.pending, (state) => {
        state.LoadingSaveProduct = true
    }).addCase(createProduct.fulfilled, (state, { payload }) => {
        state.LoadingSaveProduct = false
    }).addCase(createProduct.rejected, (state, { payload }) => {
        state.LoadingSaveProduct = false
    })
}

const onPatchProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(patchProduct.pending, (state) => {
        state.LoadingSaveProduct = true
    }).addCase(patchProduct.fulfilled, (state, { payload }) => {
        state.LoadingSaveProduct = false
    }).addCase(patchProduct.rejected, (state, { payload }) => {
        state.LoadingSaveProduct = false
    })
}


const onDeleteProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(deleteProduct.pending, (state) => {
        state.LoadingSaveProduct = true
    }).addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.LoadingSaveProduct = false
    }).addCase(deleteProduct.rejected, (state, { payload }) => {
        state.LoadingSaveProduct = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetProduct(builder);
    onCreateProduct(builder);
    onPatchProduct(builder);
    onDeleteProduct(builder);
}

export default extraReducers