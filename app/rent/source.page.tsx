'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import DatePicker from 'react-datepicker'
import DataTable, { TableColumn } from 'react-data-table-component'

import "react-datepicker/dist/react-datepicker.css";
import { Cart, CheckoutRequest } from '@/model/cart'
import { Driver } from '@/model/driver'
import ButtonLoading from '@/components/button/button.loading'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';
import { RentModel } from '@/model/rent'
import LoaderDots from '@/components/loader/loader.dots'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MemberRentState,
    SetLoadingRent
} from '@/redux/member/rent/slice'
import { getRentList } from '@/redux/member/rent/action'

const MainContainer = styled.main`
  padding: 1rem 2.5rem;
`

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
    font-size: 1.5em;
    color: ${ColorPallete.dark};
    font-weight: bold;
`


const BreadcrumbContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      font-size: 0.8rem;
      font-weight: bold;
      color: ${ColorPallete.dark};

      &.active {
        color: ${ColorPallete.darkTint.tint30};
        font-weight: 600;
      }
    } 

    span {
      font-size: 0.8em;
      color: ${ColorPallete.dark};
    }
`

const ChipDanger = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: white;
    background-color: ${ColorPallete.danger};
    padding: 5px 10px;
    border-radius: 4px;
`

const ChipWarning = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: ${ColorPallete.dark};
    background-color: ${ColorPallete.warning};
    padding: 5px 10px;
    border-radius: 4px;
`

const ChipInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: white;
    background-color: ${ColorPallete.info};
    padding: 5px 10px;
    border-radius: 4px;
`
interface IProps {
    isAuth: boolean
}

const RentSourcPage: React.FC<IProps> = ({ isAuth }) => {
    const StateMemberRent = useAppSelector(MemberRentState)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const columns: TableColumn<RentModel>[] = [
        {
            name: 'No. Sewa',
            selector: row => row.ReferenceNumber,
        },
        {
            name: 'Tanggal Pinjam',
            selector: row => row.DateRent,
        },
        {
            name: 'Tanggal Kembali',
            selector: row => row.DateReturn,
        },
        {
            name: 'Total',
            selector: row => row.Total,
        },
        {
            name: 'Status',
            cell: row => {
                return <ChipDanger>Menunggu Pembayaran</ChipDanger>
            },
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

    const tmpData: Array<RentModel> = [
        {
            ID: 1,
            ReferenceNumber: 'rent-1',
            DateRent: '2024-08-01',
            DateReturn: '2024-08-03',
            Status: 0,
            Total: 100000
        },
        {
            ID: 2,
            ReferenceNumber: 'rent-2',
            DateRent: '2024-08-01',
            DateReturn: '2024-08-03',
            Status: 1,
            Total: 500000
        },
    ];


    const initialPage = useCallback(() => {
        dispatch(getRentList());
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])
    return (
        <MainContainer>
            <NavbarCustomer isAuth={isAuth} />
            <HeaderContainer>
                <HeaderTitle>Halaman Transaksi Sewa</HeaderTitle>
                <BreadcrumbContainer>
                    <a href='#'>Beranda</a>
                    <span>/</span>
                    <a href='#' className='active'>Transaksi Sewa</a>
                </BreadcrumbContainer>
            </HeaderContainer>
            {/* <CartContainer> */}
            <DataTable
                columns={columns}
                data={StateMemberRent.Rents}
                pagination
                progressPending={StateMemberRent.LoadingRent}
                progressComponent={<LoaderDots className='h-80' />}
            // noDataComponent={<CustomEmptyData />}
            // customStyles={CustomTableStyle}
            // paginationRowsPerPageOptions={DefaultPageLength}
            // onChangeRowsPerPage={(currentRowsPerpage, currentPage) => {
            //     dispatch(setPagination({ Page: 1, PerPage: currentRowsPerpage }))
            //     dispatch(getData())
            // }}
            // paginationTotalRows={dataDiseasesState.Pagination.TotalRows ?? dataDiseasesState.Pagination.PerPage}
            // paginationPerPage={dataDiseasesState.Pagination.PerPage}
            // paginationServer
            // onChangePage={(page) => {
            //     dispatch(setPage(page))
            //     dispatch(getData())
            // }}
            // paginationDefaultPage={1}
            // paginationResetDefaultPage={true}
            />
            {/* </CartContainer> */}
            <ToastContainer
                hideProgressBar
            />
        </MainContainer>
    )
}

export default RentSourcPage