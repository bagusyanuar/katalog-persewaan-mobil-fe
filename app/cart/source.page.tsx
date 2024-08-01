'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

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

const CartPage: React.FC = () => {

    const [rentDate, setRentDate] = useState<Date | null>(new Date())
    const [arrDriver, setArrDriver] = useState<Array<number>>([1])

    const handleSelectDriver = (id: number) => {
        let selected: boolean = arrDriver.includes(id);
        if (selected) {
            let index: number = arrDriver.indexOf(id);
            let aD = [...arrDriver]
            aD.splice(index, 1)
            setArrDriver(aD)
        } else {
            let aD = [...arrDriver]
            aD.push(id)
            setArrDriver(aD)
        }
    }

    return (
        <MainContainer>
            <NavbarCustomer />
            <HeaderContainer>
                <HeaderTitle>Keranjang Belanja</HeaderTitle>
                <BreadcrumbContainer>
                    <a href='#'>Beranda</a>
                    <span>/</span>
                    <a href='#' className='active'>Keranjang</a>
                </BreadcrumbContainer>
            </HeaderContainer>
            <CartContainer>
                <ProductWrapper>
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
                                        <i className='bx bx-trash'></i>
                                    </a>
                                </div>
                            </div>
                        </CardProduct>
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
                                        <i className='bx bx-trash'></i>
                                    </a>
                                </div>
                            </div>
                        </CardProduct>
                    </ListProductWrapper>
                    <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    <p className='section-title-driver' style={{ marginBottom: '1rem' }}>Pilihan Driver</p>
                    <DriverWraper>
                        <CardDriver
                            className={arrDriver.includes(1) ? 'active' : ''}
                            onClick={() => {
                                handleSelectDriver(1);
                            }}
                        >
                            <Image
                                height={60}
                                width={80}
                                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNoVsYj60ionZI70UNhkdHZc5QciHmP1wL3Q&s`} alt='driver-image'
                                priority />
                        </CardDriver>
                        <CardDriver
                            className={arrDriver.includes(2) ? 'active' : ''}
                            onClick={() => {
                                handleSelectDriver(2);
                            }}
                        >
                            <Image
                                height={60}
                                width={80}
                                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNoVsYj60ionZI70UNhkdHZc5QciHmP1wL3Q&s`} alt='driver-image'
                                priority />
                        </CardDriver>
                    </DriverWraper>
                </ProductWrapper>
                <ActionWrapper>
                    <CardAction>
                        <p className='title'>Ringkasan Belanja</p>
                        <hr className='divider' />
                        <p className='date-title'>Tanggal Pengembalian</p>
                        <DatePicker
                            className='p-3 border-gray-500 border rounded-md w-full text-sm'
                            selected={rentDate}
                            onChange={(date) => { setRentDate(date) }}
                            minDate={new Date()}
                        />
                        <hr className='divider' />

                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Sub Total</p>
                            <p className='price'>Rp250.000</p>
                        </div>
                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Driver</p>
                            <p className='price'>Rp50.000</p>
                        </div>
                        <hr className='divider' />
                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Total</p>
                            <p className='price'>Rp300.000</p>
                        </div>
                        <hr className='divider' />
                        <ButtonPay href='/order/1/payment'>
                            <i className='bx bx-money'></i>
                            <span>Checkout</span>
                        </ButtonPay>
                    </CardAction>
                </ActionWrapper>
            </CartContainer>
        </MainContainer>
    )
}

export default CartPage