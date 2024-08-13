'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'


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
interface IProps {
    isAuth: boolean
}

const AboutSourcePage: React.FC<IProps> = ({ isAuth }) => {
    return (
        <MainContainer>
            <NavbarCustomer isAuth={isAuth} />
            <HeaderContainer>
                <HeaderTitle>Kontak</HeaderTitle>
                <BreadcrumbContainer>
                    <a href='/'>Beranda</a>
                    <span>/</span>
                    <a href='#' className='active'>Kontak</a>
                </BreadcrumbContainer>
            </HeaderContainer>
            <div className='min-h-[400px] mt-3'>
                <p className='text-2xl font-bold text-slate-700 mb-3'>Hubungi Kami</p>
                <p className='text-justify text-sm' >Jl. HOS Cokroaminoto no. 55, Surakarta (+62)82748576999</p>
            </div>
        </MainContainer>
    )
}

export default AboutSourcePage