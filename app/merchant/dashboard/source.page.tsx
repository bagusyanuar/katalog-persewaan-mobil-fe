'use client'

import React from 'react'
import Sidebar from './sidebar'
import SidebarItem from './sidebar.item'
import { usePathname } from 'next/navigation'


const MerchantDashboarSourcePage: React.FC = () => {
  
  const pathName = usePathname()

  return (
    <main>
      <Sidebar>
        <SidebarItem
          to='/merchant/dashboard'
          text='Dashboard'
          icon='bx bxs-dashboard'
          active={pathName.startsWith('/merchant/dashboard')}
        />
        <SidebarItem
          to='/merchant/product'
          text='Product'
          icon='bx bx-box'
          active={pathName.startsWith('/merchant/product')}
        />
        <SidebarItem
          to='/merchant/driver'
          text='Driver'
          icon='bx bx-user'
          active={pathName.startsWith('/merchant/driver')}
        />
        <SidebarItem
          to='/merchant/order'
          text='Order'
          icon='bx bx-shopping-bag'
          active={pathName.startsWith('/merchant/order')}
        />
      </Sidebar>
    </main>
  )
}

export default MerchantDashboarSourcePage