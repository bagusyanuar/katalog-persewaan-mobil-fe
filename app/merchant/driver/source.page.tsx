'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import ButtonPrimary from '@/components/button/button.primary'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import ModalConfirmation from '@/components/modal/modal.confirmation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantDriverState,
    SetLoadingDriver,
    SetID
} from '@/redux/merchant/driver/slice'
import { getDriverList, deleteDriver } from '@/redux/merchant/driver/action'
import { MerchantDriver } from '@/model/driver'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';

const DriverSourcePage: React.FC = () => {
    const StateMerchantDriver = useAppSelector(MerchantDriverState)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [modal, setModal] = useState<boolean>(false)

    const columns: TableColumn<MerchantDriver>[] = [
        {
            name: 'Gambar',
            cell: row => {
                return <div className='py-2'>
                    <ImageWrapper>
                        <Image src={row.Image} alt='product-image' priority height={76} width={76} />
                    </ImageWrapper>
                </div >
            },
            width: '10rem'
        },
        {
            name: 'Nama',
            selector: row => row.Name,
        },
        {
            name: 'Harga',
            selector: row => row.Price.toLocaleString('id-ID'),
        },
        {
            name: 'No. Hp',
            cell: row => {
                return row.Phone
            }
        },
        {
            name: 'Action',
            cell: row => {
                return <div className='flex items-center'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        setModal(true);
                        dispatch(SetID(row.ID))
                    }} className='mr-1 flex items-center justify-center w-8 h-8 rounded-md bg-red-500'><span className='bx bx-trash !text-white !text-sm'></span></a>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        router.push(`/merchant/driver/${row.ID}`)
                    }} className='flex items-center justify-center w-8 h-8 rounded-md bg-orange-400'><span className='bx bx-edit-alt !text-slate-900 !text-sm'></span></a>
                </div>
            },
            width: '5rem',
            center: true
        },
    ]

    const onSubmit = () => {
        dispatch(deleteDriver({ id: StateMerchantDriver.ID.toString() })).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 1000,
                            onClose: () => {
                                setModal(false)
                                dispatch(getDriverList())
                            }
                        })
                    break;
                default:
                    showToast(<ToastContent theme='error' text={payload.message} />,
                        {
                            timeToClose: 1000,
                        })
                    break;
            }

            console.log(payload);
        })

    }

    const initialPage = useCallback(async () => {
        dispatch(SetLoadingDriver(true))
        dispatch(getDriverList());
        dispatch(SetLoadingDriver(false))
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
                    active={false}
                />
                <SidebarItem
                    to='/merchant/driver'
                    text='Driver'
                    icon='bx bx-user'
                    active={true}
                />
                <SidebarItem
                    to='/merchant/order'
                    text='Order'
                    icon='bx bx-shopping-bag'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/profile'
                    text='Profile'
                    icon='bx bx-id-card'
                    active={false}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Driver</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/merchant/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='#' className='active'>Product</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>

                    <CardContent>
                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Data Product</DataTitle>
                            <ButtonPrimary onClick={() => {
                                router.push('/merchant/driver/add')
                            }}>
                                Tambah Driver
                            </ButtonPrimary>
                        </div>
                        <hr className='my-5' />
                        <DataTable
                            columns={columns}
                            data={StateMerchantDriver.Drivers}
                            pagination
                            progressPending={StateMerchantDriver.LoadingDriver}
                            progressComponent={<LoaderDots className='h-80' />}
                            persistTableHead={true}
                        />
                    </CardContent>
                </ContentContainer>
            </ContentWrapper>
            <ModalConfirmation
                open={modal}
                onAccept={() => { onSubmit() }}
                onDenied={() => {
                    setModal(false)
                }}
                text='Are you sure to delete driver?'
            />
            <ToastContainer
                hideProgressBar
            />
        </Wrapper>
    )
}

export default DriverSourcePage

const ImageWrapper = styled.div`
    height: 80px;
    width: 80px;
    border-radius: 8px;
    border: 1px solid ${ColorPallete.darkTint.tint30};
    padding: 2px 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 74px;
      width: 76px;
      object-fit: cover;
      object-position: center center;
      border-radius: 4px;
    }

`

const DataTitle = styled.p`
    margin-bottom: 0;
    color: ${ColorPallete.dark};
    font-weight: bold;
    font-size: 1em;
`

const CardContent = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: fit-content;
    width: 100%;
    border-radius: 8px;
    padding: 1rem 1rem;
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