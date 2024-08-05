'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import DatePicker from 'react-datepicker'

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
    carts: Array<Cart>
    drivers: Array<Driver>
}
const CartPage: React.FC<IProps> = ({ isAuth, carts, drivers }) => {
    const StateMemberCart = useAppSelector(MemberCartState)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [rentDate, setRentDate] = useState<Date | null>(new Date())
    const [arrDriver, setArrDriver] = useState<Array<number>>([])
    const [subTotal, setSubTotal] = useState<number>(0)
    const [driver, setDriver] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [rentDay, setRentDay] = useState<number>(0)

    const handleSelectDriver = (id: number) => {
        let selected: boolean = arrDriver.includes(id);
        if (selected) {
            let selectedDriver = drivers.find(x => x.ID === id);
            if (selectedDriver) {
                setDriver(driver - selectedDriver.Price);
            }
            let index: number = arrDriver.indexOf(id);
            let aD = [...arrDriver]
            aD.splice(index, 1)
            setArrDriver(aD)
        } else {
            let aD = [...arrDriver]
            let selectedDriver = drivers.find(x => x.ID === id);
            if (selectedDriver) {
                setDriver(driver + selectedDriver.Price);
            }
            console.log(selectedDriver);

            aD.push(id)
            setArrDriver(aD)
        }

        let total = (subTotal + driver) * rentDay
        setTotal(total);

    }

    const initialPage = useCallback(() => {
        let tmpTotal: number = 0;
        carts.forEach((cart, k) => {
            tmpTotal += cart.ProductPrice
        })
        setSubTotal(tmpTotal)
        let total = (tmpTotal + driver) * rentDay
        setTotal(total)
    }, [carts, driver])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])

    const onCheckout = () => {

        let DateReturnString: string = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
        let checkoutRequest: CheckoutRequest = {
            DateReturn: DateReturnString,
            Drivers: arrDriver,
            RentDay: rentDay
        }

        if (rentDate !== null) {
            DateReturnString = `${rentDate.getFullYear()}-${rentDate.getMonth()}-${rentDate.getDay()}`
            checkoutRequest = {
                DateReturn: DateReturnString,
                Drivers: arrDriver,
                RentDay: rentDay,
            }
        }

        dispatch(checkout({ req: checkoutRequest })).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 2000,
                            onClose: () => {
                                let id = payload.data['id'];
                                router.push(`/rent/${id}/payment`)
                                // router.replace('/')
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

    const handleDateChange = (selectedDate: Date | null) => {
        let currentDate = new Date()
        if (selectedDate !== null) {
            console.log(selectedDate, currentDate.getDate());
            const date1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay());
            const date2 = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDay());
            const diffTime = Math.abs(date2.getTime() - date1.getTime())
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setRentDay(diffDays)
            console.log(diffDays);
            let total = (subTotal + driver) * diffDays
            setTotal(total);
        }
    }

    return (
        <MainContainer>
            <NavbarCustomer isAuth={isAuth} />
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
                        {
                            carts.map((cart, k) => {
                                return <CardProduct key={k}>
                                    <Image width={500} height={200} src={cart.ProductImage} alt='product-image' priority />
                                    <div className='product-info'>
                                        <div className='product-desc-wrapper'>
                                            <p className='product-name'>{cart.ProductName}</p>
                                            <p className='product-description'>{cart.ProductDescription}</p>
                                            <p className='product-price'>Rp{cart.ProductPrice.toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className='product-action'>
                                            <a href='#' className='product-action-detail'>
                                                <i className='bx bx-trash'></i>
                                            </a>
                                        </div>
                                    </div>
                                </CardProduct>
                            })
                        }
                    </ListProductWrapper>
                    <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    <p className='section-title-driver' style={{ marginBottom: '1rem' }}>Pilihan Driver</p>
                    <DriverWraper>
                        {
                            drivers.map((driver, k) => {
                                return <CardDriver key={k}
                                    className={arrDriver.includes(driver.ID) ? 'active' : ''}
                                    onClick={() => {
                                        handleSelectDriver(driver.ID);
                                    }}
                                >
                                    <Image
                                        height={60}
                                        width={80}
                                        src={driver.Image} alt='driver-image'
                                        priority />
                                    <div className='description-wrapper'>
                                        <p className='description-name'>{driver.Name}</p>
                                        <p className='description-price mb-0'>Rp{driver.Price.toLocaleString('id-ID')}</p>
                                    </div>
                                </CardDriver>
                            })
                        }
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
                            onChange={(date) => {
                                setRentDate(date)
                                handleDateChange(date)
                            }}
                            minDate={new Date()}
                        />
                        <hr className='divider' />

                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Sub Total</p>
                            <p className='price'>Rp{subTotal.toLocaleString('id-ID')}</p>
                        </div>
                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Driver</p>
                            <p className='price'>Rp{driver.toLocaleString('id-ID')}</p>
                        </div>
                        <hr className='divider' />
                        <div className='price-wrapper mb-1'>
                            <p className='price-title'>Total</p>
                            <p className='price'>Rp{total.toLocaleString('id-ID')}</p>
                        </div>
                        <hr className='divider' />
                        <ButtonPay
                            onLoading={StateMemberCart.LoadingCheckout}
                            onClick={() => {
                                onCheckout()
                            }}
                        >
                            <i className='bx bx-money'></i>
                            <span>Checkout</span>
                        </ButtonPay>
                    </CardAction>
                </ActionWrapper>
            </CartContainer>
            <ToastContainer
                hideProgressBar
            />
        </MainContainer>
    )
}

export default CartPage