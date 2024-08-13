import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { LoginRequest } from '@/model/auth'

export const submit = createAsyncThunk<APIResponse, void, ThunkConfig>('adminLogin/submit', async (_, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const body: LoginRequest = {
            Email: state.adminLogin.Email,
            Password: state.adminLogin.Password,
        }
        const response = await axios.post('/api/admin/login', body);
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})