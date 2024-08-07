'use client'

import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import InputTextArea from '@/components/input/textarea'
import ButtonPrimary from '@/components/button/button.loading'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import ModalConfirmation from '@/components/modal/modal.confirmation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  MerchantOrderState,
  SetLoadingOrder,
  SetConfirmReason,
  SetID
} from '@/redux/merchant/order/slice'
import { getOrderList, confirmOrder } from '@/redux/merchant/order/action'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';
import { OrderDetail, OrderCart, OrderRentDriver, Order, ConfirmRequest } from '@/model/order';

interface IProps {
  data: OrderDetail
}
const OrderDetailSourcePage: React.FC<IProps> = ({ data }) => {
  const StateMerchantOrder = useAppSelector(MerchantOrderState)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [delay, setDelay] = useState<boolean>(true)
  const [rentDay, setRentDay] = useState<number>(0)
  const [modal, setModal] = useState<boolean>(false)
  const [statusOrder, setStatusOrder] = useState<string>('1')
  const [statusConfirm, setStatusConfirm] = useState<string>('accept')

  let chipStatus: ReactNode = <div>-</div>
  switch (data.Status) {
    case 0:
      chipStatus = <ChipDanger>Menunggu Pembayaran</ChipDanger>;
      break;
    case 1:
      chipStatus = <ChipWarning>Menunggu konfirmasi merchant</ChipWarning>
      break;
    case 2:
      chipStatus = <ChipInfo>Menunggu di ambil</ChipInfo>
      break;
    case 3:
      chipStatus = <ChipInfo>Proses sewa</ChipInfo>
      break;
    case 4:
      chipStatus = <ChipSuccess>Selesai</ChipSuccess>
      break;
    case 5:
      chipStatus = <ChipDanger>Pembayaran ditolak</ChipDanger>
      break;
    default:
      break;
  }

  const columns: TableColumn<OrderCart>[] = [
    {
      name: 'Gambar',
      cell: row => {
        return <div className='py-2'>
          <ImageWrapper>
            <Image src={row.Product.Image} alt='product-image' priority height={76} width={76} />
          </ImageWrapper>
        </div >
      },
      width: '10rem',
    },
    {
      name: 'Nama Mobil',
      selector: row => row.Product.Name,
    },
    {
      name: 'Harga',
      selector: row => row.Price.toLocaleString('id-ID'),
      width: '10rem',
    },
  ]

  const columnsDriver: TableColumn<OrderRentDriver>[] = [
    {
      name: 'Gambar',
      cell: row => {
        return <div className='py-2'>
          <ImageWrapper>
            <Image src={row.Driver.Image} alt='product-image' priority height={76} width={76} />
          </ImageWrapper>
        </div >
      },
      width: '10rem',
    },
    {
      name: 'Nama Driver',
      selector: row => row.Driver.Name,
    },
    {
      name: 'Harga',
      selector: row => row.Price.toLocaleString('id-ID'),
      width: '10rem',
    },
  ]

  const onSubmit = () => {

    let confirmRequest: ConfirmRequest = {
      Status: statusConfirm,
      Reason: StateMerchantOrder.ConfirmReason
    }
    dispatch(confirmOrder({ req: confirmRequest, id: data.ID })).then(response => {
      const payload: APIResponse = response.payload as APIResponse
      switch (payload.code) {
        case 200:
          showToast(<ToastContent theme='success' text={payload.message} />,
            {
              timeToClose: 1000,
              onClose: () => {
                window.location.href = '/merchant/order'
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
    setDelay(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    let rentDate = new Date(data.DateRent)
    let returnDate = new Date(data.DateReturn)
    const date1 = new Date(rentDate.getFullYear(), rentDate.getMonth(), rentDate.getDay());
    const date2 = new Date(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDay());
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setRentDay(diffDays)
    setDelay(false)
  }, [])

  useEffect(() => {
    initialPage()
    return () => { }
  }, [initialPage])

  return (
    <Wrapper>
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
          active={true}
        />
      </Sidebar>
      <ContentWrapper className='pb-5'>
        <NavbarMerchant />
        <ContentContainer>
          <HeaderContainer>
            <HeaderTitle>Halaman Detail Order</HeaderTitle>
            <BreadcrumbWrapper>
              <a href='/merchant/dashboard'>Dashboard</a>
              <span>/</span>
              <a href='/merchant/order'>Order</a>
              <span>/</span>
              <a href='#' className='active'>{data.ReferenceNumber}</a>
            </BreadcrumbWrapper>
          </HeaderContainer>
          <hr className='my-5' />
          <div className='mb-3 w-full'>
            <div className='flex items-center mb-1'>
              <TitleInfo>No. Transaksi :</TitleInfo>
              <TitleContent>{data.ReferenceNumber}</TitleContent>
            </div>
            <div className='flex items-center mb-1'>
              <TitleInfo>Customer :</TitleInfo>
              <TitleContent>{data.Customer.CustomerName}</TitleContent>
            </div>
            <div className='flex items-center mb-1'>
              <TitleInfo>No. Hp Customer :</TitleInfo>
              <TitleContent>{data.Customer.CustomerPhone}</TitleContent>
            </div>
            <div className='flex items-center mb-1'>
              <TitleInfo>Tanggal Sewa :</TitleInfo>
              <TitleContent>{data.DateRent}</TitleContent>
            </div>
            <div className='flex items-center mb-1'>
              <TitleInfo>Tanggal Kembali :</TitleInfo>
              <TitleContent>{data.DateReturn}</TitleContent>
            </div>
            <div className='flex items-center mb-1'>
              <TitleInfo>Status :</TitleInfo>
              {
                chipStatus
              }
            </div>
          </div>
          <hr className='my-5' />
          <DataTitle className='mb-3'>Data Sewa</DataTitle>
          <DataTable
            columns={columns}
            data={data.Carts}
            pagination
            progressPending={delay}
            progressComponent={<LoaderDots className='h-80' />}
          />
          <hr className='mb-5 mt-5' />
          <DataTitle className='mb-3'>Data Driver</DataTitle>
          <div>
            <DataTable
              columns={columnsDriver}
              data={data.Driver}
              pagination
              progressPending={delay}
              progressComponent={<LoaderDots className='h-80' />}
            />
          </div>
          <hr className='my-5' />
          <SummaryContainer>
            <div className='w-100 flex items-center mb-1'>
              <SummaryTitle>Sub Total :</SummaryTitle>
              <SummaryContent>Rp{data.Carts.reduce((item, { Price }) => (item + Price), 0).toLocaleString('id-ID')} ({`${rentDay} hari`})</SummaryContent>
            </div>
            <div className='w-100 flex items-center mb-1'>
              <SummaryTitle>Driver :</SummaryTitle>
              <SummaryContent>Rp{data.Driver.reduce((item, { Price }) => (item + Price), 0).toLocaleString('id-ID')} ({`${rentDay} hari`})</SummaryContent>
            </div>
            <div className='w-100 flex items-center mb-1'>
              <SummaryTitle></SummaryTitle>
              <SummaryContent><hr /></SummaryContent>
            </div>
            <div className='w-100 flex items-center mb-1'>
              <SummaryTitle>Total :</SummaryTitle>
              <SummaryContent>Rp{data.Total.toLocaleString('id-ID')}</SummaryContent>
            </div>
          </SummaryContainer>
          <hr className='my-5' />
          <div>
            <DataTitle className='mb-3'>Konfirmasi Status</DataTitle>
            {
              data.Status === 1 ?
                <>
                  <SelectContainer className='mb-3' onChange={(e) => {
                    setStatusConfirm(e.currentTarget.value)
                  }}>
                    <option value='accept'>Terima</option>
                    <option value='denied'>Tolak</option>
                  </SelectContainer>
                  {
                    statusConfirm !== 'accept' ? <InputTextArea
                      value={StateMerchantOrder.ConfirmReason}
                      onChange={(e) => {
                        dispatch(SetConfirmReason(e.currentTarget.value))
                      }}
                      placeholder='Alasan'
                    /> : <></>
                  }
                </>
                : <></>
            }


          </div>
          {
            data.Status !== 4 ? <>
              <hr className='my-5' />
              <div className='flex items-center justify-end'>
                <ButtonSave
                  onClick={() => {
                    onSubmit()
                  }}
                  onLoading={StateMerchantOrder.LoadingConfirmOrder}
                >
                  <i className='bx bx-save me-3'></i>
                  <span>Konfirmasi</span>
                </ButtonSave>
              </div>
            </> : <></>
          }

        </ContentContainer>
      </ContentWrapper>
      <ToastContainer
        hideProgressBar
      />
    </Wrapper>
  )
}

export default OrderDetailSourcePage

const SummaryTitle = styled.div`
  flex: 8;
  text-align: right;
  font-size: 0.8em;
  font-weight: bold;
  color: ${ColorPallete.dark};
`

const SummaryContent = styled.div`
  flex: 2;
  text-align: right;
  font-size: 0.8em;
  font-weight: bold;
  color: ${ColorPallete.dark};
`
const SummaryContainer = styled.div`
    width: 100%;
`

const ButtonSave = styled(ButtonPrimary)`
    width: fit-content;
    font-size: 0.8em;
    padding: 0.75rem 2rem;
`

const SelectContainer = styled.select`
    display: flex;
    align-items: center;
    border: 1px solid ${ColorPallete.light};
    border-radius: 5px;
    width: 100%;
    transition: all ease-in-out 200ms;
    font-size: 0.8em;
    padding: 0.75rem 0.75rem;

    &:focus-within {
        border-color: ${ColorPallete.lightShades.shade20};
    }

    option {
        font-size: 0.8em;
    }
`

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
    min-height: 100vh;
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
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

const ChipSuccess = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: white;
    background-color: ${ColorPallete.success};
    padding: 5px 10px;
    border-radius: 4px;
`

const TitleInfo = styled.p`
  font-size: 0.8em;
  font-weight: bold;
  color: ${ColorPallete.dark};
  margin-bottom: 0;
  margin-right: 0.5rem;
`

const TitleContent = styled.p`
  font-size: 0.8em;
  color: ${ColorPallete.dark};
  margin-bottom: 0;
`