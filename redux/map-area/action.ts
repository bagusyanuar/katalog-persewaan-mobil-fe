import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { LoginRequest } from '@/model/auth'

// export const submit = createAsyncThunk<APIResponse, void, ThunkConfig>('login/submit', async (_, { rejectWithValue, getState }) => {
//     try {
//         const state = getState()
//         const body: LoginRequest = {
//             Email: state.login.Email,
//             Password: state.login.Password,
//         }
//         const response = await axios.post('/api/member/auth/login', body);
//         return response.data
//     } catch (error: any | AxiosError) {
//         return rejectWithValue(ErrorParser(error))
//     }
// })


export const getMapArea = createAsyncThunk<APIResponse, void, ThunkConfig>('mapArea/getMapArea', async (_, { rejectWithValue, getState }) => {
    try {
        const response = await axios.get('/api/member/merchant');
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})