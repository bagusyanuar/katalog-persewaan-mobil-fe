import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getMapArea } from './action'
import { MapAreaModel } from "@/model/map.area.model";

// const onSubmitEvent = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
//     return builder.addCase(submit.pending, (state) => {
//         state.LoadingLogin = true
//     }).addCase(submit.fulfilled, (state, { payload }) => {
//         state.LoadingLogin = false
//     }).addCase(submit.rejected, (state, { payload }) => {
//         state.LoadingLogin = false
//     })
// }

const onGetMapArea = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getMapArea.pending, (state) => {
        state.LoadingMap = true
    }).addCase(getMapArea.fulfilled, (state, { payload }) => {
        console.log(payload);
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: MapAreaModel = {
                ID: v['id'],
                Name: v['name'],
                Latitude: v['latitude'],
                Longitude: v['longitude']
            }
            state.DataMap.push(element)
        })
        state.LoadingMap = false
    }).addCase(getMapArea.rejected, (state, { payload }) => {
        console.log(payload);
        state.DataMap = [];
        state.LoadingMap = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetMapArea(builder);
}

export default extraReducers