import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { MerchantProfile } from '@/model/profile'

export const submit = createAsyncThunk<APIResponse, {req: MerchantProfile}, ThunkConfig>('merchantProfile/submit', async ({req}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/profile`
        const response = await axios.post(url, req);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})