import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { LoginRequest } from '@/model/auth'

export const getMerchantProduct = createAsyncThunk<APIResponse, {id: number}, ThunkConfig>('memberMerchant/getMerchantProduct', async ({id}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/merchant/${id}/product`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})