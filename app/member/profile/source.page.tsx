'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NavbarCustomer from '@/components/navigation/navbar.customer'
import LoaderDots from '@/components/loader/loader.dots'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputTextIcon from '@/components/input/text.icon'
import InputPasswordIcon from '@/components/input/password.icon'
import PaymentImage from '@/public/assets/images/payment-bg.png'
import InputFile from '@/components/input/dropzone'
import { RentModel } from '@/model/rent'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MemberProfileState,
    SetUsername,
    SetEmail,
    SetPassword,
    SetName,
    SetPhone,
    SetAddress
} from '@/redux/member/profile/slice'
import {LogoutState} from '@/redux/logout/slice'

import { getProfile, updateProfile } from '@/redux/member/profile/action'
import { submit } from '@/redux/logout/action'

import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';
import { PaymentRequest } from '@/model/payment'
import ButtonPrimary from '@/components/button/button.loading'
import { ProfileRequest } from '@/model/profile'

interface IProps {
    isAuth: boolean
}

const ProfileSourcePage: React.FC<IProps> = ({ isAuth }) => {
    const StateMemberProfile = useAppSelector(MemberProfileState)
    const StateLogout = useAppSelector(LogoutState)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const onLogout = () => {
        dispatch(submit()).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 2000,
                            onClose: () => {
                                window.location.href = '/'
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

    const onSubmit = () => {
        let profileRequest: ProfileRequest = {
            Email: StateMemberProfile.Email,
            Username: StateMemberProfile.Username,
            Password: StateMemberProfile.Password,
            Name: StateMemberProfile.Name,
            Phone: StateMemberProfile.Phone,
            Address: StateMemberProfile.Address,
        }
        dispatch(updateProfile({req: profileRequest})).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 2000,
                            onClose: () => {
                                window.location.reload()
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

    const initialPage = useCallback(() => {
        dispatch(getProfile());
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])

    return (
        <MainContainer>
            <NavbarCustomer isAuth={isAuth} />
            <HeaderContainer>
                <HeaderTitle>Halaman Profil</HeaderTitle>
                <BreadcrumbContainer>
                    <a href='#'>Beranda</a>
                    <span>/</span>
                    <a href='#' className='active'>Profile</a>
                </BreadcrumbContainer>
            </HeaderContainer>
            <Wrapper>
                <SidebarWrapper>
                    <SidebarItem className='active'>Profile</SidebarItem>
                    <SidebarItem onClick={() => {
                        router.push('/rent')
                    }}>Transaksi</SidebarItem>
                    <SidebarItem onClick={() => {
                        onLogout()
                    }}>Logout</SidebarItem>
                </SidebarWrapper>
                <ContentWrapper>
                    {
                        StateMemberProfile.LoadingGetProfile ?
                            <LoaderDots height='25rem' />
                            :
                            <>
                                <InputTextIcon
                                    icon='bx bx-envelope'
                                    value={StateMemberProfile.Email}
                                    placeholder='email'
                                    onChange={(e) => {
                                        dispatch(SetEmail(e.currentTarget.value))
                                    }}
                                    className='mb-3'
                                />
                                <InputTextIcon
                                    icon='bx bx-user'
                                    value={StateMemberProfile.Username}
                                    placeholder='username'
                                    onChange={(e) => {
                                        dispatch(SetUsername(e.currentTarget.value))
                                    }}
                                    className='mb-3'
                                />
                                <InputPasswordIcon
                                    value={StateMemberProfile.Password}
                                    onChange={(e) => {
                                        dispatch(SetPassword(e.currentTarget.value))
                                    }}
                                    icon='bx bx-lock-alt'
                                    placeholder='password'
                                    className='mb-3'
                                    withShowPassword
                                />
                                <InputTextIcon
                                    icon='bx bx-id-card'
                                    value={StateMemberProfile.Name}
                                    placeholder='nama lengkap'
                                    onChange={(e) => {
                                        dispatch(SetName(e.currentTarget.value))
                                    }}
                                    className='mb-3'
                                />
                                <InputTextIcon
                                    icon='bx bx-phone'
                                    value={StateMemberProfile.Phone}
                                    placeholder='no. hp'
                                    onChange={(e) => {
                                        dispatch(SetPhone(e.currentTarget.value))
                                    }}
                                    className='mb-3'
                                />
                                <InputTextIcon
                                    icon='bx bx-home'
                                    value={StateMemberProfile.Address}
                                    placeholder='alamat'
                                    onChange={(e) => {
                                        dispatch(SetAddress(e.currentTarget.value))
                                    }}
                                    className='mb-3'
                                />
                                <hr className='mb-3' />
                                <div className='flex justify-end'>
                                    <ButtonPrimary
                                        onClick={() => { 
                                            onSubmit()
                                        }}
                                        onLoading={StateMemberProfile.LoadingSaveProfile}
                                    >
                                        <i className='bx bx-save me-3'></i>
                                        Simpan
                                    </ButtonPrimary>
                                </div>
                            </>
                    }

                </ContentWrapper>
            </Wrapper>
            <ToastContainer
                hideProgressBar
            />
        </MainContainer>
    )
}

export default ProfileSourcePage

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
`

const SidebarWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-right: solid 1px ${ColorPallete.darkTint.tint20};
    padding-right: 1rem;
`

const ContentWrapper = styled.div`
    flex: 4;
    padding: 0 1rem;
`

const SidebarItem = styled.div`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    color: ${ColorPallete.darkTint.tint20};
    transition: background-color ease-in-out 200ms, color ease-in-out 250ms;
    border-radius: 10px;
    padding: 1rem 0.75rem;
    font-size: 1em;

    &:hover {
        background-color: ${ColorPallete.primary};
        color: white;
    }

    &.active {
        background-color: ${ColorPallete.primary};
        color: white;
    }

    i {
        margin-right: 1rem;
    }

    span {
        font-weight: 500;
        line-height: 1px;
    }
`


