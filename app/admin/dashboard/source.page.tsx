'use client'

import React from 'react'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import { usePathname } from 'next/navigation'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import styled from 'styled-components'
import Image from 'next/image'
import LogoImage from '@/public/assets/images/logo.png'
import { ColorPallete } from '@/components/color'


const MerchantDashboarSourcePage: React.FC = () => {

  const pathName = usePathname()

  return (
    <Wrapper>
      <Sidebar>
        <SidebarItem
          to='/admin/dashboard'
          text='Dashboard'
          icon='bx bxs-dashboard'
          active={true}
        />
        <SidebarItem
          to='/admin/member'
          text='Member'
          icon='bx bx-user'
          active={false}
        />
        <SidebarItem
          to='/admin/merchant'
          text='Merchant'
          icon='bx bx-group'
          active={false}
        />
      </Sidebar>
      <ContentWrapper>
        <NavbarMerchant />
        <ContentContainer>
          <HeaderContainer>
            <HeaderTitle>Halaman Driver</HeaderTitle>
            <BreadcrumbWrapper>
              <a href='#' className='active'>Dashboard</a>
            </BreadcrumbWrapper>
          </HeaderContainer>
          <div className='w-full h-[400px] flex items-center justify-center flex-col gap-3'>
            <Image src={LogoImage} alt='logo-image' height={150} width={150} priority />
            <DashboardText>Selamat Datang Di Dashboard Admin Car Rental</DashboardText>
          </div>
        </ContentContainer>
      </ContentWrapper>
    </Wrapper>
  )
}

export default MerchantDashboarSourcePage

const DashboardText = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: ${ColorPallete.dark};
  margin-bottom: 0;
  width: 100%;
  text-align: center;
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
`

const ContentWrapper = styled.div`
    padding-left: 260px;
    height: 100vh;
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
`

const HeaderContainer = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
`

const HeaderTitle = styled.p`
    margin-bottom: 0;
    font-size: 1em;
    color: ${ColorPallete.dark};
    font-weight: bold;
`