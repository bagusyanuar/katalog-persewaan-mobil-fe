import { AxiosServerInstance } from '@/lib/axios';
// import RentPaymentSourcePage from './soruce.page'
import { getIronSessionData } from '@/lib/session'
import { MerchantDriver } from '@/model/driver';
import { notFound } from 'next/navigation';
import EditDriverSourcePage from './source.page'

export default async function ProductEditPage({ params }: { params: { id: string } }) {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/merchant/driver/${params.id}`
    let serverResponse = await AxiosServerInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    let data = serverResponse.data['data'];
    if (data === null) {
        notFound()
    }

    let driver: MerchantDriver = {
        ID: data['id'],
        Name: data['name'],
        Price: data['price'],
        Image: data['image'],
        Phone: data['phone'],
    }
    console.log(serverResponse);
    return <EditDriverSourcePage data={driver} />
}