import CartSourcePage from './source.page'
import { AxiosServerInstance } from '@/lib/axios'
import { Merchant } from '@/model/merchant'
import { getIronSessionData } from '@/lib/session'
import { Cart } from '@/model/cart'
import { Driver } from '@/model/driver'

export default async function CartPage() {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }
    let serverResponse = await AxiosServerInstance.get('/customer/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let data = serverResponse.data['data'];
    let responseCarts = data['carts'] as Array<any>;
    let responseDrivers = data['drivers'] as Array<any>;

    let carts: Array<Cart> = []
    let drivers: Array<Driver> = [];

    responseCarts.forEach((v, k) => {
        let tmpCart: Cart = {
            ID: v['id'],
            ProductID: v['product_id'],
            ProductName: v['product']['name'],
            ProductImage: `${ServerImage}${v['product']['image']}`,
            ProductDescription: v['product']['description'],
            ProductPrice: v['product']['price']
        }
        carts.push(tmpCart)
    })
    
    responseDrivers.forEach((v, k) => {
        let tmpDriver: Driver = {
            ID: v['id'],
            MerchantID: v['merchant_id'],
            Name: v['name'],
            Image: `${ServerImage}${v['image']}`,
            Phone: v['phone'],
            Price: v['price']
        }
        drivers.push(tmpDriver)
    })

    return <CartSourcePage
        isAuth={isAuth}
        carts={carts}
        drivers={drivers}
    />
}