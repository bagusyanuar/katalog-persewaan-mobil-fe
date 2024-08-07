import { AxiosServerInstance } from '@/lib/axios';
// import RentPaymentSourcePage from './soruce.page'
import { getIronSessionData } from '@/lib/session'
import { Product } from '@/model/product';
import { notFound } from 'next/navigation';
import ProductEditSourcePage from './source.page'

export default async function ProductEditPage({ params }: { params: { id: string } }) {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/merchant/product/${params.id}`
    let serverResponse = await AxiosServerInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    let data = serverResponse.data['data'];
    if (data === null) {
        notFound()
    }

    let product: Product = {
        ID: data['id'],
        Name: data['name'],
        Price: data['price'],
        Description: data['description'],
        Image: data['image'],
        VehicleNumber: data['vehicle_number']
    }
    console.log(serverResponse);
    return <ProductEditSourcePage data={product} />
}