import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TState } from './state'
import { getMemberList} from './action'
import { Member } from "@/model/member";

const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

const onGetMember = (builder: ActionReducerMapBuilder<TState>): ActionReducerMapBuilder<TState> => {
    return builder.addCase(getMemberList.pending, (state) => {
        state.LoadingMember = true
    }).addCase(getMemberList.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Members = []
        let data = payload.data as Array<any>
        data.forEach((v, k) => {
            let element: Member = {
                ID: v['id'],
                Name: v['name'],
                Address: v['address'],
                Phone: v['phone'],
                Email: v['user']['email'],
                Username: v['user']['username']
            }
            state.Members.push(element)
        })
        state.LoadingMember = false
    }).addCase(getMemberList.rejected, (state, { payload }) => {
        console.log(payload);
        state.LoadingMember = false
        state.Members = []
    })
}


const extraReducers = (builder: ActionReducerMapBuilder<TState>) => {
    onGetMember(builder);
}

export default extraReducers