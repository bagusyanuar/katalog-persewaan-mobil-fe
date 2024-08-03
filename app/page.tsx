import Image from "next/image";
import ExampleMap from '@/components/map'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import GreetingHero from '@/components/hero/greeting.hero'
import MapArea from '@/components/google-map/map.area'
import JoinMerchant from './join.merchant'
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { getIronSessionData } from '@/lib/session'


export default async function Home() {
  const session: any = await getIronSessionData()

  let token: string = session['token'];
  let isAuth: boolean = false;
  if (token) {
    isAuth = true;
  }

  console.log(session);

  return (
    <>
      <NavbarCustomer isAuth={isAuth} />
      <GreetingHero />
      <MapArea />
      <JoinMerchant />
      {/* // <ExampleMap /> */}
    </>
  );
}
