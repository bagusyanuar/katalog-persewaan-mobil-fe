import axios, { AxiosError, AxiosResponse } from "axios"
import { APIResponse } from './util'

export const ServerURL: string | undefined = process.env.ENDPOINT as string
export const ServerImage: string | undefined = process.env.BASE_ENDPOINT as string

export const AxiosServerInstance = axios.create({
    baseURL: ServerURL,
    headers: {
        // "Content-Type": 'multipart/form-data',
    },
    withCredentials: true
})

export const AxiosInternalAPI = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
    },
})

export const ErrorParser = (error: any | AxiosError): APIResponse => {
    if (axios.isAxiosError(error) && error.response) {
        return {
            code: error.response.data.code,
            message: error.response.data.message,
            data: error.response.data.data,
            meta: error.response.data.meta
        }
    }
    return {
        code: 500,
        message: 'internal server error',
        data: null,
        meta: null
    }
}