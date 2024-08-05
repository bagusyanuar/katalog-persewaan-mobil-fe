import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getRentList } from './action'
import { RentModel } from "@/model/rent";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetRentList = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getRentList.pending, (state) => {
        state.LoadingRent = true
    }).addCase(getRentList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.LoadingRent = false
        let data = payload.data as Array<any>
        state.Rents = [];
        data.forEach((v, k) => {
            let element: RentModel = {
                ID: v['id'],
                ReferenceNumber: v['reference_number'],
                DateRent: v['date_rent'],
                DateReturn: v['date_return'],
                Status: v['status'],
                Total: v['total']
            }
            state.Rents.push(element)
        })
    }).addCase(getRentList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingRent = false
        state.Rents = [];
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetRentList(builder);
}

export default extraReducers