'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import PaymentImage from '@/public/assets/images/payment-bg.png'
import InputFile from '@/components/input/dropzone'

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

const ButtonPay = styled.a`
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${ColorPallete.primary};
    border-radius: 8px;
    color: white;

    i {
      color: white;
      font-size: 1.5em;
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

const PaymentPage: React.FC = () => {
    const [thumbnail, setThumbnail] = useState<File | null>(null)

    const onReceiveFiles = (files: File[]) => {
        if (files.length > 0) {
            setThumbnail(files[0])
        } else {
            setThumbnail(null)
        }
    }
    return (
        <MainContainer>
            <NavbarCustomer />
            <HeaderContainer>
                <HeaderTitle>Pembayaran</HeaderTitle>
                <BreadcrumbContainer>
                    <a href='#'>Beranda</a>
                    <span>/</span>
                    <a href='#'>Transaksi</a>
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
                            <p className='price'>Rp300.000</p>
                        </div>
                        <hr className='divider' />
                        <InputTextIcon
                            icon='bx bx-id-card'
                            value={``}
                            placeholder='atas nama'
                            onChange={() => { }}
                            className='mb-3'
                        />
                        <p className='transfer-label'>Pilihan Bank</p>
                        <SelectContainer className='mb-3'>
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
                        <ButtonPay href='/order/1/payment'>
                            <i className='bx bx-money'></i>
                            <span>Bayar</span>
                        </ButtonPay>
                    </CardAction>
                </ActionWrapper>
            </PaymentContainer>
        </MainContainer>
    )
}

export default PaymentPage