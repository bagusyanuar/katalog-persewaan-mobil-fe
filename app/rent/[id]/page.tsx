import { AxiosServerInstance } from '@/lib/axios';
import RentDetailSourcePage from './source.page'
import { getIronSessionData } from '@/lib/session'
import { RentDetailModel, RentCart, RentDriver } from '@/model/rent';
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

    let dataCarts = data['carts'] as Array<any>;
    let dataRentDriver = data['rent_driver'] as Array<any>;

    let arrCart: Array<RentCart> = [];
    let arrRentDriver: Array<RentDriver> = [];

    dataCarts.forEach((v, k) => {
        let tmpCart: RentCart = {
            ID: v['id'],
            Price: v['price'],
            Product: {
                ID: v['product']['id'],
                Name: v['product']['name'],
                Image: `${ServerImage}${v['product']['image']}`
            }
        }
        arrCart.push(tmpCart)
    })

    dataRentDriver.forEach((v, k) => {
        let tmpRentDriver: RentDriver = {
            ID: v['id'],
            Price: v['price'],
            Profile: {
                ID: v['driver']['id'],
                Image: `${ServerImage}${v['driver']['image']}`,
                Name: v['driver']['name']
            }
        }
        arrRentDriver.push(tmpRentDriver)
    })

    let dataRentDetail: RentDetailModel = {
        ID: data['id'],
        ReferenceNumber: data['reference_number'],
        DateRent: data['date_rent'],
        DateReturn: data['date_return'],
        Status: data['status'],
        Total: data['total'],
        Carts: arrCart,
        Drivers: arrRentDriver
    }

    console.log(data);
    return <RentDetailSourcePage
        isAuth={isAuth}
        dataRentDetail={dataRentDetail}
    />
}