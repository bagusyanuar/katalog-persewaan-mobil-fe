import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { CartRequest } from '@/model/cart'

export const addToCart = createAsyncThunk<APIResponse, {id: number}, ThunkConfig>('memberCart/addToCart', async ({id}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/cart`
        let body: CartRequest = {
            ProductID: id
        }
        const response = await axios.post(url, body);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})