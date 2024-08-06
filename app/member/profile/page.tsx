import { AxiosServerInstance } from '@/lib/axios';
import RentDetailSourcePage from './source.page'
import { getIronSessionData } from '@/lib/session'
import ProfileSourcePage from './source.page'

export default async function ProfilePage() {
    const session: any = await getIronSessionData()
    const ServerImage = 'http://katalog-persewaan-mobil.test:8080'

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }
    return <ProfileSourcePage
        isAuth={isAuth}
    />
}