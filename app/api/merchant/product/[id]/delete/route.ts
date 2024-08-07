import { APIResponse, ErrorParser } from "@/lib/util"
import { RentModel } from "@/model/rent"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getIronSession, SessionData } from 'iron-session'
import { sessionOptions, User } from '@/lib/session'
import { cookies } from 'next/headers'
import { AxiosServerInstance } from '@/lib/axios'
import { NextRequest, NextResponse } from "next/server"
import { getIronSessionData } from '@/lib/session'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session: any = await getIronSessionData()
        let token: string = session['token'];

        let serverResponse = await AxiosServerInstance.delete(`/merchant/product/${params.id}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let data = serverResponse.data['data'];
        const response: APIResponse = {
            code: 200,
            message: 'successfully delete product',
            data: data
        }
        return Response.json(response, { status: response.code })
    } catch (error: any | AxiosError) {
        console.log(error);
        const response: APIResponse = ErrorParser(error)
        return Response.json(response, { status: response.code })
    }
}