import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getProfile, updateProfile } from './action'
import { MerchantProduct } from "@/model/merchant";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetProfile = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getProfile.pending, (state) => {
        state.LoadingGetProfile = true
    }).addCase(getProfile.fulfilled, (state, { payload }) => {
        console.log(payload);
        let data = payload.data as any
        state.Email = data['email'];
        state.Username = data['username']
        state.Name = data['customer']['name']
        state.Phone = data['customer']['phone']
        state.Address = data['customer']['address']
        state.LoadingGetProfile = false
    }).addCase(getProfile.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingGetProfile = false
    })
}


const onUpdateProfile = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(updateProfile.pending, (state) => {
        state.LoadingSaveProfile = true
    }).addCase(updateProfile.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.LoadingSaveProfile = false
    }).addCase(updateProfile.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingSaveProfile = false
    })
}

const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetProfile(builder);
    onUpdateProfile(builder);
}

export default extraReducers