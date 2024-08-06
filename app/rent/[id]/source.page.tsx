'use client'

import React, { ReactNode, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import PaymentImage from '@/public/assets/images/payment-bg.png'
import DataTable, { TableColumn } from 'react-data-table-component'
import LoaderDots from '@/components/loader/loader.dots'
import InputFile from '@/components/input/dropzone'
import { RentDetailModel, RentDriver, RentModel } from '@/model/rent'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  MemberRentState,
  SetLoadingRent,
} from '@/redux/member/rent/slice'
import { payment } from '@/redux/member/rent/action'

import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';
import ButtonPrimary from '@/components/button/button.loading'
import { PaymentRequest } from '@/model/payment'
import { RentCart } from '@/model/rent'

interface IProps {
  isAuth: boolean
  dataRentDetail: RentDetailModel
}

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

const RentDetailSourcePage: React.FC<IProps> = ({ isAuth, dataRentDetail }) => {

  const [rentDay, setRentDay] = useState<number>(0)
  const [delay, setDelay] = useState<boolean>(true)
  let chipStatus: ReactNode = <div>-</div>
  switch (dataRentDetail.Status) {
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
      chipStatus = <ChipSuccess>Proses sewa</ChipSuccess>
      break;
    case 5:
      chipStatus = <ChipDanger>Pembayaran ditolak</ChipDanger>
      break;
    default:
      break;
  }

  const columns: TableColumn<RentCart>[] = [
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

  const columnsDriver: TableColumn<RentDriver>[] = [
    {
      name: 'Gambar',
      cell: row => {
        return <div className='py-2'>
          <ImageWrapper>
            <Image src={row.Profile.Image} alt='product-image' priority height={76} width={76} />
          </ImageWrapper>
        </div >
      },
      width: '10rem',
    },
    {
      name: 'Nama Driver',
      selector: row => row.Profile.Name,
    },
    {
      name: 'Harga',
      selector: row => row.Price.toLocaleString('id-ID'),
      width: '10rem',
    },
  ]

  const initialPage = useCallback(async () => {
    setDelay(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    let rentDate = new Date(dataRentDetail.DateRent)
    let returnDate = new Date(dataRentDetail.DateReturn)
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
    <MainContainer>
      <NavbarCustomer isAuth={isAuth} />
      <HeaderContainer>
        <HeaderTitle>Pembayaran</HeaderTitle>
        <BreadcrumbContainer>
          <a href='#'>Beranda</a>
          <span>/</span>
          <a href='/rent'>Transaksi</a>
          <span>/</span>
          <a href='#' className='active'>{dataRentDetail.ReferenceNumber}</a>
        </BreadcrumbContainer>
      </HeaderContainer>
      <div className='mb-3 w-full'>
        <div className='flex items-center'>
          <TitleInfo>No. Transaksi :</TitleInfo>
          <TitleContent>{dataRentDetail.ReferenceNumber}</TitleContent>
        </div>
        <div className='flex items-center'>
          <TitleInfo>Tanggal Sewa :</TitleInfo>
          <TitleContent>{dataRentDetail.DateRent}</TitleContent>
        </div>
        <div className='flex items-center'>
          <TitleInfo>Tanggal Kembali :</TitleInfo>
          <TitleContent>{dataRentDetail.DateReturn}</TitleContent>
        </div>
        <div className='flex items-center'>
          <TitleInfo>Status :</TitleInfo>
          {
            chipStatus
          }
        </div>
      </div>
      <hr className='mb-3' />
      <DataTitle className='mb-3'>Data Sewa</DataTitle>
      <div>
        <DataTable
          columns={columns}
          data={dataRentDetail.Carts}
          pagination
          progressPending={delay}
          progressComponent={<LoaderDots className='h-80' />}
        />
      </div>
      <hr className='mb-5 mt-5' />
      <DataTitle className='mb-3'>Data Driver</DataTitle>
      <div>
        <DataTable
          columns={columnsDriver}
          data={dataRentDetail.Drivers}
          pagination
          progressPending={delay}
          progressComponent={<LoaderDots className='h-80' />}
        />
      </div>
      <hr className='mb-5 mt-5' />
      <SummaryContainer>
        <div className='w-100 flex items-center mb-1'>
          <SummaryTitle>Sub Total :</SummaryTitle>
          <SummaryContent>Rp{dataRentDetail.Carts.reduce((item, { Price }) => (item + Price), 0).toLocaleString('id-ID')} ({`${rentDay} hari`})</SummaryContent>
        </div>
        <div className='w-100 flex items-center mb-1'>
          <SummaryTitle>Driver :</SummaryTitle>
          <SummaryContent>Rp{dataRentDetail.Drivers.reduce((item, { Price }) => (item + Price), 0).toLocaleString('id-ID')} ({`${rentDay} hari`})</SummaryContent>
        </div>
        <div className='w-100 flex items-center mb-1'>
          <SummaryTitle></SummaryTitle>
          <SummaryContent><hr /></SummaryContent>
        </div>
        <div className='w-100 flex items-center mb-1'>
          <SummaryTitle>Total :</SummaryTitle>
          <SummaryContent>Rp{dataRentDetail.Total.toLocaleString('id-ID')}</SummaryContent>
        </div>
      </SummaryContainer>
      <ToastContainer
        hideProgressBar
      />
    </MainContainer>
  )
}

export default RentDetailSourcePage

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
const DataTitle = styled.p`
  width: 100%;
  color: ${ColorPallete.dark};
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 10px;
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