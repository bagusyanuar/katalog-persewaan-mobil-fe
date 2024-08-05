import { APIResponse, ErrorParser } from "@/lib/util"
import { CheckoutRequest } from "@/model/cart"
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
        console.log(token);
        
        const req: CheckoutRequest = await request.json() as CheckoutRequest
        const body = {
            'date_return': req.DateReturn,
            'rent_day': req.RentDay,
            'driver': req.Drivers
        }

       
        let serverResponse = await AxiosServerInstance.post('/customer/cart/checkout', {data: JSON.stringify(body)}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let data = serverResponse.data['data'];
        const response: APIResponse = {
            code: 200,
            message: 'successfully checkout',
            data: data
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}