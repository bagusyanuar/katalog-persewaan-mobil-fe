import { AxiosServerInstance } from '@/lib/axios';
// import RentPaymentSourcePage from './soruce.page'
import { getIronSessionData } from '@/lib/session'
import { MerchantProfile } from '@/model/profile';
import { notFound } from 'next/navigation';
import MerchantProfileSourcePage from './source.page'

export default async function MerchantProfilePage() {

    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/merchant/profile`
    let serverResponse = await AxiosServerInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    let data = serverResponse.data['data'];
    if (data === null) {
        notFound()
    }

    let profile: MerchantProfile = {
        Email: data['user']['email'],
        Address: data['address'],
        Latitude: data['latitude'],
        Longitude: data['longitude'],
        Name: data['name'],
        Password: '',
        Phone: data['phone'],
        Username: data['user']['username']
    }
    return <MerchantProfileSourcePage profile={profile} />
}