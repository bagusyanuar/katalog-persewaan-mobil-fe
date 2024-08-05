import { AxiosServerInstance } from '@/lib/axios';
import RentDetailSourcePage from './source.page'
import { getIronSessionData } from '@/lib/session'
import { RentDetailModel } from '@/model/rent';
import { notFound } from 'next/navigation';

export default async function RentDetailPage({ params }: { params: { id: string } }) {
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
    let data = serverResponse.data['data'];
    console.log(data);
    return <RentDetailSourcePage isAuth={isAuth} />
}