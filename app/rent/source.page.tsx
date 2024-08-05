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
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MemberCartState,
    Reset,
    SetLoadingAddToCart
} from '@/redux/member/cart/slice'
import { checkout } from '@/redux/member/cart/action'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';
import { RentModel } from '@/model/rent'

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

const CartContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
`

const ProductWrapper = styled.div`
    flex: 5;
    width: 100%;
    min-height: 200px;
    margin-bottom: 1rem;

    .section-title-driver {
        font-size: 1em;
        font-weight: bold;
        color: ${ColorPallete.dark};
    }
`

const DriverWraper = styled.div`
    width: 100%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 1rem;
`

const ActionWrapper = styled.div`
    flex: 2;
    width: 100%;
`

const CardAction = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: fit-content;
    width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem;

    .title {
      font-size: 1em;
      font-weight: bold;
      color: ${ColorPallete.dark};
    }

    .divider {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    .date-title {
        font-size: 0.8em;
        color: ${ColorPallete.dark};
        font-weight: 600;
        margin-bottom: 8px;
    }

    .price-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price-title {
            font-weight: 500;
            color: ${ColorPallete.darkTint.tint30};
            font-size: 1em;
        }
        
        .price {
            font-weight: 700;
            color: ${ColorPallete.dark};
            font-size: 1em;
        }
    }
`

const ListProductWrapper = styled.div`
    width: 100%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 1rem;
`

const CardProduct = styled.div`
    width: 100%;
    height: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    
    img {
      width: auto;
      height: 170px;
      object-fit: contain;
      object-position: center center;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 130px;

      .product-desc-wrapper {
          padding: 0.25rem 0.5rem;

          .product-name {
              font-size: 0.8em;
              color: ${ColorPallete.dark};
              text-align: justify;
              font-weight: 600;
          }

          .product-description {
              font-size: 0.7em;
              color: ${ColorPallete.darkTint.tint30};
              text-align: justify;
              height: 32px;
          }

          .product-price {
              font-size: 0.9em;
              color: ${ColorPallete.dark};
              text-align: justify;
              font-weight: 700;
          }
      }

      .product-action {
          display: flex;
          justify-content: end;
          padding: 0.5rem 0.5rem;

          .product-action-detail {
              height: 30px;
              width: 30px;
              border-radius: 50%;
              background-color: ${ColorPallete.danger};
              display: flex;
              justify-content: center;
              align-items: center;
              
              i {
                font-size: 0.8em;
                color: white;
              }
          }
      }
    }
`

const CardDriver = styled.div`
    width: 100%;
    height: 80px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        height: 76px !important;
        width: 80px !important;
        object-fit: cover;
        object-position: center center;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    &.active {
        border: 2px solid ${ColorPallete.primary};
    }

    .description-wrapper {
        padding: 12px 12px;

        .description-name {
            font-size: 0.8em;
            font-weight: 600;
            color: ${ColorPallete.dark};
            margin-bottom: 5px;
        }

        .description-price {
            font-size: 1em;
            font-weight: bold;
            color: ${ColorPallete.dark};
        }
    }
`


const ButtonPay = styled(ButtonLoading)`
    width: 100%;
    padding: 0.75rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${ColorPallete.primary};
    border-radius: 8px;
    color: white;

    i {
      color: white;
      font-size: 1em;
    }
`

interface IProps {
    isAuth: boolean
}

const RentSourcPage: React.FC<IProps> = ({ isAuth }) => {

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
            name: 'Action',
            cell: row => {
                return <div className='flex items-center'>
                    <a href='#' onClick={(e) => {
                        e.preventDefault();
                        // router.push({
                        //     pathname: '/diseases/[id]/detail',
                        //     query: { id: row.ID },
                        // })
                    }} className='mr-3 flex items-center'><span className='material-icons-round text-slate-600 !text-sm mr-1'>visibility</span><span>Detail</span></a>
                </div>
            },
            width: '18rem',
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
                    data={tmpData}
                    pagination
                // progressPending={dataDiseasesState.LoadingData}
                // progressComponent={<InfinityLoader className='h-80' />}
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