import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { PaymentRequest } from '@/model/payment'

export const getRentList = createAsyncThunk<APIResponse, void, ThunkConfig>('memberRent/getRentList', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/rent`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})


export const payment = createAsyncThunk<APIResponse, {req: PaymentRequest, id: number}, ThunkConfig>('memberRent/payment', async ({req, id}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/rent/${id}/payment`
        
        let form = new FormData()
        form.append('account_name', req.AccountName)
        form.append('account_bank', req.AccountBank)
        form.append('attachment', req.Attachment)
        form.append('id', id.toString())
        const response = await axios.post(url, form);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})
