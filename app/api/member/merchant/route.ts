import { APIResponse, ErrorParser } from "@/lib/util"
import { LoginRequest } from "@/model/auth"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getIronSession, SessionData } from 'iron-session'
import { sessionOptions, User } from '@/lib/session'
import { cookies } from 'next/headers'
import { AxiosServerInstance } from '@/lib/axios'
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        let serverResponse = await AxiosServerInstance.get('/customer/merchant')
        console.log(serverResponse);
        const response: APIResponse = {
            code: 200,
            message: 'successfully',
            data: serverResponse.data['data']
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}