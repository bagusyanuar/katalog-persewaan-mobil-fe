import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { ConfirmRequest } from '@/model/order'

export const getOrderList = createAsyncThunk<APIResponse, {start: string, end: string}, ThunkConfig>('merchantReport/getOrderList', async ({start, end}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/report?start=${start}&end=${end}`
        const response = await axios.get(url);
        console.log(response);
        
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})
