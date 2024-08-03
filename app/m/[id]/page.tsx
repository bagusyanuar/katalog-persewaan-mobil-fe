import MerchantProductSourcePage from './source.page'
import { AxiosServerInstance } from '@/lib/axios'
import { Merchant } from '@/model/merchant'
import { getIronSessionData } from '@/lib/session'

export default async function MerchantProductPage({ params }: { params: { id: string } }) {
    console.log(params.id);
    const session: any = await getIronSessionData()

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }
    let url = `/customer/merchant/${params.id}`
    let serverResponse = await AxiosServerInstance.get(url)
    let data = serverResponse.data['data']
    let dataMerchant: Merchant | null = null;
    if (data !== null) {
        dataMerchant = {
            ID: data['id'],
            UserID: data['user_id'],
            Name: data['name'],
            Address: data['address'],
            Phone: data['phone'],
            Latitude: data['latitude'],
            Longitude: data['longitude']
        }
    }
    return <MerchantProductSourcePage
        merchant={dataMerchant}
        isAuth={isAuth}
    />
}