import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { MerchantDriverRequest } from '@/model/driver'

export const getDriverList = createAsyncThunk<APIResponse, void, ThunkConfig>('merchantDriver/getDriverList', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/driver`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})

export const createDriver = createAsyncThunk<APIResponse, { req: MerchantDriverRequest }, ThunkConfig>('merchantDriver/createDriver', async ({ req }, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/driver/`

        let form = new FormData()
        form.append('name', req.Name)
        form.append('phone', req.Phone)
        form.append('price', req.Price.toString())
        if (req.Image !== null) {
            form.append('image', req.Image)
        }
        const response = await axios.post(url, form);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})

export const patchDriver = createAsyncThunk<APIResponse, { req: MerchantDriverRequest }, ThunkConfig>('merchantDriver/patchDriver', async ({ req }, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/driver/${req.ID}`

        let form = new FormData()
        form.append('id', req.ID.toString())
        form.append('name', req.Name)
        form.append('phone', req.Phone)
        form.append('price', req.Price.toString())
        if (req.Image !== null) {
            form.append('image', req.Image)
        }

        const response = await axios.post(url, form);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})


export const deleteDriver = createAsyncThunk<APIResponse, { id: string }, ThunkConfig>('merchantDriver/deleteDriver', async ({ id }, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/driver/${id}/delete`
        const response = await axios.post(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})