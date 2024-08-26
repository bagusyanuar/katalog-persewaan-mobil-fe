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
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantReportState,
    SetLoadingOrder,
    SetID
} from '@/redux/merchant/report/slice'
import { getOrderList } from '@/redux/merchant/report/action'
import { Order } from '@/model/order'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';

const ProductSourcePage: React.FC = () => {
    const StateMerchantReport = useAppSelector(MerchantReportState)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [modal, setModal] = useState<boolean>(false)
    const [statusOrder, setStatusOrder] = useState<string>('4')
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())


    const columns: TableColumn<Order>[] = [
        {
            name: 'No. Reference',
            cell: row => {
                return row.ReferenceNumber
            },
            width: '15rem'
        },
        {
            name: 'Nama Customer',
            selector: row => row.Customer.CustomerName,
            width: '15rem'
        },
        {
            name: 'No. HP',
            selector: row => row.Customer.CustomerPhone,
            width: '15rem'
        },
        {
            name: 'Tanggal Sewa',
            selector: row => row.DateRent,
            width: '15rem'
        },
        {
            name: 'Tanggal Kembali',
            selector: row => row.DateReturn,
            width: '15rem'
        },
        {
            name: 'Total',
            selector: row => row.Total.toLocaleString('id-ID'),
        },
        {
            name: 'Action',
            cell: row => {
                return <div className='flex items-center'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        router.push(`/merchant/order/${row.ID}`)
                    }} className='mr-3 flex items-center'><span className='bx bx-dots-vertical-rounded text-slate-600 !text-sm'></span></a>
                </div>
            },
            width: '5rem',
            center: true
        },
    ]

    const handleChangeDate = (start: Date | null, end: Date | null) => {

        let startDateValue: string = new Date().toISOString().split('T')[0]
        let endDateValue: string = new Date().toISOString().split('T')[0]
        if (start !== null && end !== null) {
            startDateValue = start.toISOString().split('T')[0]
            endDateValue = end.toISOString().split('T')[0]
        }
        dispatch(getOrderList({ start: startDateValue, end: endDateValue }));
        
        console.log(startDateValue);

    }

    const initialPage = useCallback(async () => {
        let startDateValue: string = new Date().toISOString().split('T')[0]
        let endDateValue: string = new Date().toISOString().split('T')[0]
        if (startDate !== null && endDate !== null) {
            startDateValue = startDate.toISOString().split('T')[0]
            endDateValue = endDate.toISOString().split('T')[0]
        }
        dispatch(getOrderList({ start: startDateValue, end: endDateValue }));
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
                    active={false}
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
                <SidebarItem
                    to='/merchant/report'
                    text='Laporan'
                    icon='bx bx-receipt'
                    active={true}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Order</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/merchant/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='#' className='active'>Order</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>
                    <div className='flex gap-3 items-center mb-5'>
                        <DatePicker
                            className='p-3 border-gray-500 border rounded-md w-full text-sm'
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date)
                                handleChangeDate(date, endDate)
                                // handleDateChange(date)
                            }}
                        // minDate={new Date()}
                        />
                        <DatePicker
                            className='p-3 border-gray-500 border rounded-md w-full text-sm'
                            selected={endDate}
                            onChange={(date) => {
                                setEndDate(date)
                                handleChangeDate(startDate, date)
                                // handleDateChange(date)
                            }}
                        // minDate={new Date()}
                        />
                    </div>
                    <CardContent>

                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Data Order</DataTitle>
                        </div>
                        <hr className='my-5' />
                        <DataTable
                            columns={columns}
                            data={StateMerchantReport.Orders}
                            pagination
                            progressPending={StateMerchantReport.LoadingOrder}
                            progressComponent={<LoaderDots className='h-80' />}
                            persistTableHead={true}
                        />
                    </CardContent>
                </ContentContainer>
            </ContentWrapper>
            {/* <ModalConfirmation
                open={modal}
                onAccept={() => { onSubmit() }}
                onDenied={() => {
                    setModal(false)
                }}
                text='Are you sure to delete product?'
            /> */}
            <ToastContainer
                hideProgressBar
            />
        </Wrapper>
    )
}

export default ProductSourcePage

const TabStatus = styled.div`
    font-size: 0.8em;
    background-color: white;
    border: 1px solid ${ColorPallete.primary};
    color: ${ColorPallete.primary};
    border-radius: 12px;
    padding: 0.5rem 2rem;
    cursor: pointer;

    &.active {
        background-color: ${ColorPallete.primary};
        border-color: ${ColorPallete.primary};
        color: white;
    }
`

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