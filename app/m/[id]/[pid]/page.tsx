import ProductDetailSourcePage from './source.page'
import { AxiosServerInstance, ServerImage } from '@/lib/axios'
import { MerchantProductWithMerchant } from '@/model/merchant'
import { getIronSessionData } from '@/lib/session'

export default async function ProductDetailPage({ params }: { params: { id: string, pid: string } }) {
    console.log(params.id);
    const session: any = await getIronSessionData()
    let token: string = session['token'];
    console.log(token);

    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/customer/product/${params.pid}`
    let serverResponse = await AxiosServerInstance.get(url)
    let data = serverResponse.data['data']
    let dataMerchantProduct: MerchantProductWithMerchant | null = null;
    if (data !== null) {
        dataMerchantProduct = {
            ID: data['id'],
            MerchantID: data['merchant_id'],
            VehicleNumber: data['vehicle_number'],
            Name: data['name'],
            Price: data['price'],
            Image: `${ServerImage}${data['image']}`,
            Description: data['description'],
            Merchant: {
                Nama: data['merchant']['merchant']['name']
            }
        }
    }
    return <ProductDetailSourcePage
        dataMerchantProductWithMerchant={dataMerchantProduct}
        isAuth={isAuth} />
}