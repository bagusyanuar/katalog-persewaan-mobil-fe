import axios, { AxiosError } from 'axios'

export type APIResponse = {
    code: number
    message: string
    data?: any
    meta?: any
}

export const ErrorParser = (error: any | AxiosError): APIResponse => {
    let value: APIResponse = {
        code: 500,
        message: 'internal server error',
        data: null
    }

    if (axios.isAxiosError(error) && error.response) {
        value.code = error.response.status;
        value.message = error.response.data?.meta?.message ?? 'unknown error';
        value.data = error.response.data?.data;
        value.meta = error.response.data?.meta;
    }
    return value
}
