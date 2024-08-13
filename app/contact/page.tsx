import AboutSourcePage from './source.page'
import { AxiosServerInstance } from '@/lib/axios'
import { getIronSessionData } from '@/lib/session'

export default async function AboutPage() {
    const session: any = await getIronSessionData()

    let token: string = session['token'];
    let isAuth: boolean = false;
    if (token) {
        isAuth = true;
    }
    return <AboutSourcePage isAuth={isAuth} />
}