import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getOrderList} from './action'
import { MerchantProduct } from "@/model/merchant";
import { Order } from "@/model/order";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetOrder = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getOrderList.pending, (state) => {
        state.LoadingOrder = true
    }).addCase(getOrderList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Orders = []
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: Order = {
                ID: v['id'],
                DateRent: v['date_rent'],
                DateReturn: v['date_return'],
                ReferenceNumber: v['reference_number'],
                Status: v['status'],
                Total: v['total'],
                Customer: {
                    CustomerName: v['user']['customer']['name'],
                    CustomerPhone: v['user']['customer']['phone']
                }
            }
            state.Orders.push(element)
        })
        state.LoadingOrder = false
    }).addCase(getOrderList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingOrder = false
        state.Orders = []
    })
}

// const onCreateProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
//     return builder.addCase(createProduct.pending, (state) => {
//         state.LoadingSaveProduct = true
//     }).addCase(createProduct.fulfilled, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     }).addCase(createProduct.rejected, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     })
// }

// const onPatchProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
//     return builder.addCase(patchProduct.pending, (state) => {
//         state.LoadingSaveProduct = true
//     }).addCase(patchProduct.fulfilled, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     }).addCase(patchProduct.rejected, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     })
// }


// const onDeleteProduct = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
//     return builder.addCase(deleteProduct.pending, (state) => {
//         state.LoadingSaveProduct = true
//     }).addCase(deleteProduct.fulfilled, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     }).addCase(deleteProduct.rejected, (state, { payload }) => {
//         state.LoadingSaveProduct = false
//     })
// }

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetOrder(builder);
    // onCreateProduct(builder);
    // onPatchProduct(builder);
    // onDeleteProduct(builder);
}

export default extraReducers