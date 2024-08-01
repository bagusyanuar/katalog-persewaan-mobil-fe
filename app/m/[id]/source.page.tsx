'use client'

import React from 'react'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'

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

const MerchantContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
`

const ProductWrapper = styled.div`
    flex: 5;
    width: 100%;
    min-height: 200px;
`

const InfoWrapper = styled.div`
    flex: 2;
    width: 100%;
`

const CardInfo = styled.div`
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

    .title-section {
      font-weight: 600;
      color: ${ColorPallete.dark};
      font-size: 0.8em;
      margin-bottom: 5px;
    }

    .description-section {
      color: ${ColorPallete.darkTint.tint30};
      font-size: 0.8em;
    }
`

const ListProductWrapper = styled.div`
    width: 100%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
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
              background-color: ${ColorPallete.primary};
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

const ButtonContact = styled.a`
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #25D366;
    border-radius: 8px;
    color: white;

    i {
      color: white;
      font-size: 1.5em;
    }
`

const MerchantProductSourcePage = () => {
  return (
    <MainContainer>
      <NavbarCustomer />
      <HeaderContainer>
        <HeaderTitle>Merchant A</HeaderTitle>
        <BreadcrumbContainer>
          <a href='#'>Beranda</a>
          <span>/</span>
          <a href='#' className='active'>Merchant A</a>
        </BreadcrumbContainer>
      </HeaderContainer>
      <MerchantContainer>
        <ProductWrapper>
          <InputTextIcon
            icon='bx bx-search'
            value={``}
            placeholder='cari product...'
            onChange={() => { }}
            className='mb-3'
          />
          <ListProductWrapper>
            <CardProduct>
              <Image width={500} height={200} src='https://www.toyota.astra.co.id//sites/default/files/2023-09/1-avanza-purplish-silver.png' alt='product-image' priority />
              <div className='product-info'>
                <div className='product-desc-wrapper'>
                  <p className='product-name'>Toyota Avanza Tahun 2020</p>
                  <p className='product-description'>Lorem ipsum </p>
                  <p className='product-price'>Rp250.000</p>
                </div>
                <div className='product-action'>
                  <a href='#' className='product-action-detail'>
                    <i className='bx bx-right-arrow-alt'></i>
                  </a>
                </div>
              </div>
            </CardProduct>
          </ListProductWrapper>
        </ProductWrapper>
        <InfoWrapper>
          <CardInfo>
            <p className='title'>Informasi Merchant</p>
            <hr className='divider' />
            <p className='title-section'>No. Whatsapp</p>
            <p className='description-section mb-3'>+62821748692</p>
            <p className='title-section'>Alamat</p>
            <p className='description-section mb-3'>jl. Hos Cokroaminoto no. 55</p>
            <hr className='divider' />
            <ButtonContact href='#'>
              <i className='bx bxl-whatsapp'></i>
              <span>Hubungi Merchant</span>
            </ButtonContact>
          </CardInfo>
        </InfoWrapper>
      </MerchantContainer>
    </MainContainer>
  )
}

export default MerchantProductSourcePage