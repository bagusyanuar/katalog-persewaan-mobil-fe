import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { RegisterMerchantRequest } from '@/model/auth'

export const submit = createAsyncThunk<APIResponse, {req: RegisterMerchantRequest}, ThunkConfig>('register/submit', async ({req}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/auth/register`
        const response = await axios.post(url, req);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})