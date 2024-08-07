import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/lib/util'
import { ErrorParser } from '@/lib/axios'
import { ThunkConfig } from '@/lib/redux'
import { ProductRequest } from '@/model/product'

export const getOrderList = createAsyncThunk<APIResponse, {status: string}, ThunkConfig>('merchantOrder/getOrderList', async ({status}, { rejectWithValue, getState }) => {
    try {
        let url = `/api/merchant/order?status=${status}`
        const response = await axios.get(url);
        console.log(response);
        
        return response.data
    } catch (error: any | AxiosError) {
        return rejectWithValue(ErrorParser(error))
    }
})

// export const createProduct = createAsyncThunk<APIResponse, { req: ProductRequest }, ThunkConfig>('merchantProduct/createProduct', async ({ req }, { rejectWithValue, getState }) => {
//     try {
//         let url = `/api/merchant/product/`

//         let form = new FormData()
//         form.append('name', req.Name)
//         form.append('vehicle_number', req.VehicleNumber)
//         form.append('price', req.Price.toString())
//         form.append('description', req.Description)
//         if (req.Image !== null) {
//             form.append('image', req.Image)
//         }
//         const response = await axios.post(url, form);
//         return response.data
//     } catch (error: any | AxiosError) {
//         return rejectWithValue(ErrorParser(error))
//     }
// })

// export const patchProduct = createAsyncThunk<APIResponse, { req: ProductRequest }, ThunkConfig>('merchantProduct/patchProduct', async ({ req }, { rejectWithValue, getState }) => {
//     try {
//         let url = `/api/merchant/product/${req.ID}`

//         let form = new FormData()
//         form.append('id', req.ID.toString())
//         form.append('name', req.Name)
//         form.append('vehicle_number', req.VehicleNumber)
//         form.append('price', req.Price.toString())
//         form.append('description', req.Description)
//         if (req.Image !== null) {
//             form.append('image', req.Image)
//         }

//         const response = await axios.post(url, form);
//         return response.data
//     } catch (error: any | AxiosError) {
//         return rejectWithValue(ErrorParser(error))
//     }
// })


// export const deleteProduct = createAsyncThunk<APIResponse, { id: string }, ThunkConfig>('merchantProduct/deleteProduct', async ({ id }, { rejectWithValue, getState }) => {
//     try {
//         let url = `/api/merchant/product/${id}/delete`
//         const response = await axios.post(url);
//         return response.data
//     } catch (error: any | AxiosError) {
//         return rejectWithValue(ErrorParser(error))
//     }
// })