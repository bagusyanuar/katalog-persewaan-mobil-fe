import Image from "next/image";
import ExampleMap from '@/components/map'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import GreetingHero from '@/components/hero/greeting.hero'
import MapArea from '@/components/google-map/map.area'
import JoinMerchant from './join.merchant'

export default function Home() {
  return (
    <>
      <NavbarCustomer />
      <GreetingHero />
      <MapArea />
      <JoinMerchant />
      {/* // <ExampleMap /> */}
    </>
  );
}
