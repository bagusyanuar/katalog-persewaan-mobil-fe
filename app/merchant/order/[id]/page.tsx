import { AxiosServerInstance } from '@/lib/axios';
// import RentPaymentSourcePage from './soruce.page'
import { getIronSessionData } from '@/lib/session'
import { OrderDetail, OrderCart, OrderRentDriver, Order } from '@/model/order';
import { notFound } from 'next/navigation';
import OrderDetailSourcePage from './source.page'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {

    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }

    let url = `/merchant/order/${params.id}`
    let serverResponse = await AxiosServerInstance.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let data = serverResponse.data['data'];
    let carts = data['carts'] as Array<any>
    let drivers = data['rent_driver'] as Array<any>
    console.log(serverResponse.data['data']);
    
    let tmpCarts: Array<OrderCart> = [];
    let tmpDrivers: Array<OrderRentDriver> = [];

    carts.forEach((v) => {
        let tmpCart: OrderCart = {
            Price: v['price'],
            Product: {
                Name: v['product']['name'],
                Image: `${ServerImage}${v['product']['image']}`
            }
        }
        tmpCarts.push(tmpCart)
    });
    
    drivers.forEach((v) => {
        let tmpDriver: OrderRentDriver = {
            Price: v['price'],
            Driver: {
                Name: v['driver']['name'],
                Image: `${ServerImage}${v['driver']['image']}`
            }
        }
        tmpDrivers.push(tmpDriver)
    });

    let dataDetail: OrderDetail = {
        ID: data['id'],
        Customer: {
            CustomerName: data['user']['customer']['name'],
            CustomerPhone: data['user']['customer']['phone']
        },
        DateRent: data['date_rent'],
        DateReturn: data['date_return'],
        ReferenceNumber: data['reference_number'],
        Status: data['status'],
        Total: data['total'],
        Carts: tmpCarts,
        Driver: tmpDrivers
    }

    return <OrderDetailSourcePage data={dataDetail} />
}