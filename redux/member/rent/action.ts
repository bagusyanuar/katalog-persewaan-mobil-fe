import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { CartRequest, CheckoutRequest } from '@/model/cart'

export const getRentList = createAsyncThunk<APIResponse, void, ThunkConfig>('memberRent/getRentList', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/rent`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})