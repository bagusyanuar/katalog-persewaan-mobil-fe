'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantProductState,
    SetLoadingProduct,
} from '@/redux/merchant/product/slice'
// import { submit } from '@/redux/logout/action'
import { Product } from '@/model/product'

const ProductSourcePage: React.FC = () => {
    const StateMerchantProduct = useAppSelector(MerchantProductState)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const columns: TableColumn<Product>[] = [
        {
            name: 'Gambar',
            selector: row => row.Image,
        },
        {
            name: 'Nama',
            selector: row => row.Name,
        },
        {
            name: 'Plat Nomor',
            selector: row => row.VehicleNumber,
        },
        {
            name: 'Harga',
            selector: row => row.Price.toLocaleString('id-ID'),
        },
        {
            name: 'Deskripsi',
            center: true,
            selector: row => row.Description,
        },
        {
            name: 'Action',
            cell: row => {
                return <div className='flex items-center'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        router.push(`/rent/${row.ID}`)
                    }} className='mr-3 flex items-center'><span className='bx bx-dots-vertical-rounded text-slate-600 !text-sm'></span></a>
                </div>
            },
            width: '5rem',
            center: true
        },
    ]

    const initialPage = useCallback(async () => {
        // dispatch(getProfile());
        dispatch(SetLoadingProduct(true))
        await new Promise((resolve) => setTimeout(resolve, 500))
        dispatch(SetLoadingProduct(false))
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])
    return (
        <Wrapper >
            <Sidebar>
                <SidebarItem
                    to='/merchant/dashboard'
                    text='Dashboard'
                    icon='bx bxs-dashboard'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/product'
                    text='Product'
                    icon='bx bx-box'
                    active={true}
                />
                <SidebarItem
                    to='/merchant/driver'
                    text='Driver'
                    icon='bx bx-user'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/order'
                    text='Order'
                    icon='bx bx-shopping-bag'
                    active={false}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Product</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/merchant/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='#' className='active'>Product</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>
                    <hr className='my-3' />
                    <DataTable
                        columns={columns}
                        data={[]}
                        pagination
                        progressPending={StateMerchantProduct.LoadingProduct}
                        progressComponent={<LoaderDots className='h-80' />}
                    />
                </ContentContainer>
            </ContentWrapper>
        </Wrapper>
    )
}

export default ProductSourcePage

const HeaderContainer = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`

const HeaderTitle = styled.p`
    margin-bottom: 0;
    font-size: 1em;
    color: ${ColorPallete.dark};
    font-weight: bold;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`

const ContentWrapper = styled.div`
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
`