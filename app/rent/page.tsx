import RentSourcePage from './source.page'
import { getIronSessionData } from '@/lib/session'

export default async function RentPage() {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }
    return <RentSourcePage isAuth={isAuth} />
}