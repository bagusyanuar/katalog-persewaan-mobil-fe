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

interface IProps {
  isAuth: boolean
}

const RentDetailSourcePage: React.FC<IProps> = ({ isAuth }) => {
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
            <ToastContainer
                hideProgressBar
            />
        </MainContainer>
  )
}

export default RentDetailSourcePage

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