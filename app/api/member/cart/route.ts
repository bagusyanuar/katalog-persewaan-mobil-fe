import { APIResponse, ErrorParser } from "@/lib/util"
import { CartRequest } from "@/model/cart"
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
        
        const req: CartRequest = await request.json() as CartRequest
        const body = {
            'product_id': req.ProductID,
        }

        let formData = new FormData()
        formData.append('product_id', req.ProductID.toString())
        let serverResponse = await AxiosServerInstance.post('/customer/cart', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const response: APIResponse = {
            code: 200,
            message: 'successfully add to cart'
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}