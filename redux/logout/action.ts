import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { LoginRequest } from '@/model/auth'

export const submit = createAsyncThunk<APIResponse, void, ThunkConfig>('logout/submit', async (_, { rejectWithValue, getState }) => {
    try {
        const response = await axios.get('/api/member/auth/logout');
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})