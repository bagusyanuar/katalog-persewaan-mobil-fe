'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import PaymentImage from '@/public/assets/images/payment-bg.png'
import InputFile from '@/components/input/dropzone'
import { RentModel } from '@/model/rent'
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

const PaymentContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
`

const ImageWrapper = styled.div`
    flex: 3;
    width: 100%;
    min-height: 420px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 350px;
        width: auto;
    }

`

const ActionWrapper = styled.div`
    flex: 1;
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

    .transfer-label {
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

const ButtonPay = styled(ButtonPrimary)`
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

interface IProps {
    isAuth: boolean
    dataRent: RentModel
}
const PaymentSourcePage: React.FC<IProps> = ({ isAuth, dataRent }) => {
    const StateMemberRent = useAppSelector(MemberRentState)
    const dispatch = useAppDispatch()
    const router = useRouter()


    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [accountName, setAccountName] = useState<string>('')
    const [accountBank, setAccountbank] = useState<string>('')

    const onReceiveFiles = (files: File[]) => {
        if (files.length > 0) {
            setThumbnail(files[0])
        } else {
            setThumbnail(null)
        }
    }

    const handlePayment = () => {
        if (thumbnail !== null) {
            let paymentRequest: PaymentRequest = {
                AccountBank: accountBank,
                AccountName: accountName,
                Attachment: thumbnail
            }

            dispatch(payment({
                id: dataRent.ID,
                req: paymentRequest
            })).then(response => {
                const payload: APIResponse = response.payload as APIResponse
                switch (payload.code) {
                    case 200:
                        showToast(<ToastContent theme='success' text={payload.message} />,
                            {
                                timeToClose: 2000,
                                onClose: () => {
                                    window.location.href = '/rent'
                                }
                            })
                        break;
                    default:
                        showToast(<ToastContent theme='error' text={payload.message} />,
                            {
                                timeToClose: 2000,
                            })
                        break;
                }

                console.log(payload);
            })
        }

    }
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
                    <a href='#' className='active'>Order-1</a>
                </BreadcrumbContainer>
            </HeaderContainer>
            <PaymentContainer>
                <ImageWrapper>
                    <Image src={PaymentImage} alt='img-payment' priority />
                </ImageWrapper>
                <ActionWrapper>
                    <CardAction>
                        <p className='title'>Ringkasan Belanja</p>
                        <hr className='divider' />
                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Total</p>
                            <p className='price'>Rp{dataRent.Total.toLocaleString('id-ID')}</p>
                        </div>
                        <hr className='divider' />
                        <InputTextIcon
                            icon='bx bx-id-card'
                            value={accountName}
                            placeholder='atas nama'
                            onChange={(e) => {
                                setAccountName(e.currentTarget.value)
                            }}
                            className='mb-3'
                        />
                        <p className='transfer-label'>Pilihan Bank</p>
                        <SelectContainer className='mb-3' onChange={(e) => {
                            setAccountbank(e.currentTarget.value)
                        }}>
                            <option value='BCA'>BCA</option>
                            <option value='BRI'>BRI</option>
                            <option value='MANDIRI'>MANDIRI</option>
                        </SelectContainer>
                        <p className='transfer-label'>Bukti Transfer</p>
                        <InputFile
                            label='Thumbnail'
                            onReceiveFiles={onReceiveFiles}
                            multiple={false}
                            maxSize={1000000}
                        />
                        <hr className='divider' />
                        <ButtonPay
                            onLoading={StateMemberRent.LoadingPayment}
                            onClick={() => { handlePayment() }}
                        >
                            <i className='bx bx-money'></i>
                            <span>Bayar</span>
                        </ButtonPay>
                    </CardAction>
                </ActionWrapper>
            </PaymentContainer>
            <hr className='mt-5 mb-5'/>
            <div className='w-100'>
                <p className='text-slate-900 font-bold text-lg'>Cara Pembayaran</p>
                <p className='text-slate-600'>1. Pilih Bank</p>
                <p className='text-slate-600'>2. Transfer Ke Rekening BCA No. Rekening 8812985968 Atas Nama Bambang</p>
                <p className='text-slate-600'>3. upload bukti pembayaran</p>
            </div>
            <ToastContainer
                hideProgressBar
            />
        </MainContainer>
    )
}

export default PaymentSourcePage