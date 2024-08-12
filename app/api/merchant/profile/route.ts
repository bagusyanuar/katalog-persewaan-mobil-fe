import { APIResponse, ErrorParser } from "@/lib/util"
import { MerchantProfile } from "@/model/profile"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getIronSession, SessionData } from 'iron-session'
import { sessionOptions, User } from '@/lib/session'
import { cookies } from 'next/headers'
import { AxiosServerInstance } from '@/lib/axios'
import { NextRequest, NextResponse } from "next/server"
import { getIronSessionData } from '@/lib/session'

export async function POST(request: NextRequest) {
    try {
        const session: any = await getIronSessionData()
        let token: string = session['token'];
        const req: MerchantProfile = await request.json() as MerchantProfile
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
        let serverResponse = await AxiosServerInstance.post('/merchant/profile', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let data = serverResponse.data['data']
        const response: APIResponse = {
            code: 200,
            message: 'successfully update profile'
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}