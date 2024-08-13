import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { MerchantDriverRequest } from '@/model/driver'

export const getMemberList = createAsyncThunk<APIResponse, void, ThunkConfig>('adminMember/getMemberList', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/admin/member`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})