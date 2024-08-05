import { AxiosServerInstance } from '@/lib/axios';
import RentPaymentSourcePage from './soruce.page'
import { getIronSessionData } from '@/lib/session'
import { RentModel } from '@/model/rent';
import { notFound } from 'next/navigation';

export default async function RentPaymentPage({ params }: { params: { id: string } }) {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/customer/rent/${params.id}`
    let serverResponse = await AxiosServerInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(serverResponse);
    
    let data = serverResponse.data['data'];
    if (data === null) {
        notFound()
    }
    let dataRent: RentModel = {
        ID: data['id'],
        DateRent: data['date_rent'],
        DateReturn: data['date_return'],
        ReferenceNumber: data['reference_number'],
        Status: data['status'],
        Total: data['total']
    }
    return <RentPaymentSourcePage isAuth={isAuth} dataRent={dataRent} />
}