import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { ProfileRequest } from '@/model/profile'

export const getProfile = createAsyncThunk<APIResponse, void, ThunkConfig>('memberProfile/getProfile', async (_, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/profile`
        const response = await axios.get(url);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})


export const updateProfile = createAsyncThunk<APIResponse, {req: ProfileRequest}, ThunkConfig>('memberProfile/updateProfile', async ({req}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/member/profile`
        const response = await axios.post(url, req);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})