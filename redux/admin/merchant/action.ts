import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { MerchantDriverRequest } from '@/model/driver'

export const getMerchantList = createAsyncThunk<APIResponse, void, ThunkConfig>('adminMerchant/getMerchantList', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/admin/merchant`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})