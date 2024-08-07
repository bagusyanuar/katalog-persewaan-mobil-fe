import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getDriverList, createDriver, patchDriver, deleteDriver } from './action'
import { MerchantProduct } from "@/model/merchant";
import { MerchantDriver } from "@/model/driver";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetDriver = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getDriverList.pending, (state) => {
        state.LoadingDriver = true
    }).addCase(getDriverList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Drivers = []
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: MerchantDriver = {
                ID: v['id'],
                Name: v['name'],
                Price: v['price'],
                Image: `${ServerImage}${v['image']}`,
                Phone: v['phone'],
            }
            state.Drivers.push(element)
        })
        state.LoadingDriver = false
    }).addCase(getDriverList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingDriver = false
        state.Drivers = []
    })
}

const onCreateDriver = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(createDriver.pending, (state) => {
        state.LoadingSaveDriver = true
    }).addCase(createDriver.fulfilled, (state, { payload }) => {
        state.LoadingSaveDriver = false
    }).addCase(createDriver.rejected, (state, { payload }) => {
        state.LoadingSaveDriver = false
    })
}

const onPatchDriver = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(patchDriver.pending, (state) => {
        state.LoadingSaveDriver = true
    }).addCase(patchDriver.fulfilled, (state, { payload }) => {
        state.LoadingSaveDriver = false
    }).addCase(patchDriver.rejected, (state, { payload }) => {
        state.LoadingSaveDriver = false
    })
}


const onDeleteDriver = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(deleteDriver.pending, (state) => {
        state.LoadingSaveDriver = true
    }).addCase(deleteDriver.fulfilled, (state, { payload }) => {
        state.LoadingSaveDriver = false
    }).addCase(deleteDriver.rejected, (state, { payload }) => {
        state.LoadingSaveDriver = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetDriver(builder);
    onCreateDriver(builder);
    onPatchDriver(builder);
    onDeleteDriver(builder);
}

export default extraReducers