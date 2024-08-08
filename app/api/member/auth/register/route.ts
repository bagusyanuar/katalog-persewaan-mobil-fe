import { APIResponse, ErrorParser } from "@/lib/util"
import { RegisterMerchantRequest } from "@/model/auth"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getIronSession, SessionData } from 'iron-session'
import { sessionOptions, User } from '@/lib/session'
import { cookies } from 'next/headers'
import { AxiosServerInstance } from '@/lib/axios'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const req: RegisterMerchantRequest = await request.json() as RegisterMerchantRequest
        const body = {
            'email': req.Email,
            'username': req.Username,
            'password': req.Password,
            'name': req.Name,
            'phone': req.Phone,
            'address': req.Address,
            'latitude': req.Latitude,
            'longitude': req.Longitude,
        }

        let formData = new FormData()
        formData.append('email', body.email)
        formData.append('username', body.username)
        formData.append('password', body.password)
        formData.append('name', body.name)
        formData.append('phone', body.phone)
        formData.append('address', body.address)
        formData.append('latitude', body.latitude)
        formData.append('longitude', body.longitude)
        let serverResponse = await AxiosServerInstance.post('/customer/register', formData)
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
            message: 'successfully register'
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}