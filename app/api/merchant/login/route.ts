import { APIResponse, ErrorParser } from "@/lib/util"
import { LoginRequest } from "@/model/auth"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getIronSession, SessionData } from 'iron-session'
import { sessionOptions, User } from '@/lib/session'
import { cookies } from 'next/headers'
import { AxiosServerInstance } from '@/lib/axios'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const req: LoginRequest = await request.json() as LoginRequest
        const body = {
            'email': req.Email,
            'password': req.Password
        }

        let formData = new FormData()
        formData.append('email', body.email)
        formData.append('password', body.password)
        let serverResponse = await AxiosServerInstance.post('/merchant/login', formData)
        let data = serverResponse.data['data']
        let email: string = data['username'];
        let token: string = data['access_token'];
        let username: string = data['username'];
        let userSession: User = {
            email: email,
            username: username
        }
        const session = await getIronSession<SessionData>(cookies(), sessionOptions)
        session.user = userSession
        session.token = token
        await session.save()
        const response: APIResponse = {
            code: 200,
            message: 'successfully login'
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}