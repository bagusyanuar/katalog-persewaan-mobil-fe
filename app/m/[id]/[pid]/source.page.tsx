'use client'

import React from 'react'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import { MerchantProductWithMerchant } from '@/model/merchant'

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

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 0.5rem;

    .image-wrapper {
        flex: 4;
        height: 350px;
        border: 1px solid ${ColorPallete.darkTint.tint40};
        width: 100%;
        border-radius: 8px;
        padding: 0.25rem 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center center;
          border-radius: 6px;
        }
    }

    .detail-wrapper {
        flex: 5;

        .detail-title {
            font-size: 1.25em;
            font-weight: bold;
            color: ${ColorPallete.dark};
        }

        .extra {
          color: ${ColorPallete.darkTint.tint40};
          font-size: 0.8em;
        }
        
        .detail-price {
            font-size: 1.75em;
            font-weight: bold;
            color: ${ColorPallete.primary};
        }

        .section-description {
          color: ${ColorPallete.darkTint.tint30};
          font-size: 0.9em;
        }

        .detail-description {
          color: ${ColorPallete.dark};
          font-size: 1em;
          text-align: justify;
        }
    }

    .action-wrapper {
      flex: 3;
    }
`

const CardContent = styled.div`
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: fit-content;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
`

const ButtonCart = styled.a`
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

interface IProps {
  dataMerchantProductWithMerchant: MerchantProductWithMerchant | null
  isAuth: boolean
}
const ProductDetailPage: React.FC<IProps> = ({ dataMerchantProductWithMerchant, isAuth }) => {
  return (
    <MainContainer>
      <NavbarCustomer />
      <HeaderContainer>
        <HeaderTitle>{dataMerchantProductWithMerchant?.Name}</HeaderTitle>
        <BreadcrumbContainer>
          <a href='#'>Beranda</a>
          <span>/</span>
          <a href='#'>{dataMerchantProductWithMerchant?.Merchant.Nama}</a>
          <span>/</span>
          <a href='#' className='active'>{dataMerchantProductWithMerchant?.Name}</a>
        </BreadcrumbContainer>
      </HeaderContainer>
      <Wrapper>
        <div className='image-wrapper'>
          <Image width={500} height={200} src={dataMerchantProductWithMerchant?.Image ?? ''} alt='product-image' priority />
        </div>
        <div className='detail-wrapper'>
          <p className='detail-title mb-0'>{dataMerchantProductWithMerchant?.Name}</p>
          <p className='extra mb-3'>Harga sewa perhari</p>
          <p className='detail-price mb-5'>Rp{dataMerchantProductWithMerchant?.Price.toLocaleString('id-ID')}</p>
          <p className='section-description'>Deskripsi</p>
          <p className='detail-description'>{dataMerchantProductWithMerchant?.Description}</p>
        </div>
        <div className='action-wrapper'>
          <CardContent>
            
            <ButtonCart href={isAuth ? '/cart' : '/member'}>
              <i className='bx bx-cart'></i>
              <span>Tambah Ke Keranjang</span>
            </ButtonCart>
          </CardContent>
        </div>
      </Wrapper>
    </MainContainer>
  )
}

export default ProductDetailPage