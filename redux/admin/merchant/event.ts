import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getMerchantList} from './action'
import { AdminMerchant } from "@/model/merchant";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetMerchant = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getMerchantList.pending, (state) => {
        state.LoadingMerchant = true
    }).addCase(getMerchantList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Merchants = []
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: AdminMerchant = {
                ID: v['id'],
                Name: v['name'],
                Address: v['address'],
                Phone: v['phone'],
                Email: v['user']['email'],
                Username: v['user']['username'],
                Latitude: v['latitude'],
                Longitude: v['longitude']
            }
            state.Merchants.push(element)
        })
        state.LoadingMerchant = false
    }).addCase(getMerchantList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingMerchant = false
        state.Merchants = []
    })
}


const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetMerchant(builder);
}

export default extraReducers