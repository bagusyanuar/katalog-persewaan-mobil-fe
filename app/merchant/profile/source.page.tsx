'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import ButtonPrimary from '@/components/button/button.loading'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import InputText from '@/components/input/text'
import InputTextArea from '@/components/input/textarea'
import InputTextIcon from '@/components/input/text.icon'
import InputLabel from '@/components/label/label'
import InputPasswordIcon from '@/components/input/password.icon'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import ModalConfirmation from '@/components/modal/modal.confirmation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantProfileState,
    Reset,
    SetAddress, SetEmail, SetLatitude, SetLoadingSave, SetLongitude, SetName, SetPassword, SetPhone, SetUsername,
} from '@/redux/merchant/profile/slice'
import { submit } from '@/redux/merchant/profile/action'
import { MerchantProfile } from '@/model/profile'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';


interface IProps {
    profile: MerchantProfile
}

const MerchantProfileSourcePage: React.FC<IProps> = ({ profile }) => {
    const StateMerchantProfile = useAppSelector(MerchantProfileState)
    const dispatch = useAppDispatch()

    const onSubmit = () => {
        let request: MerchantProfile = {
            Email: StateMerchantProfile.Email,
            Address: StateMerchantProfile.Address,
            Latitude: StateMerchantProfile.Latitude,
            Longitude: StateMerchantProfile.Longitude,
            Name: StateMerchantProfile.Name,
            Password: StateMerchantProfile.Password,
            Phone: StateMerchantProfile.Phone,
            Username: StateMerchantProfile.Username
        }
        dispatch(submit({ req: request})).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 1000,
                            onClose: () => {
                                window.location.reload()
                            }
                        })
                    break;
                default:
                    showToast(<ToastContent theme='error' text={payload.message} />,
                        {
                            timeToClose: 1000,
                        })
                    break;
            }

            console.log(payload);
        })


    }

    const initialPage = useCallback(() => {
        dispatch(Reset());
        dispatch(SetEmail(profile.Email))
        dispatch(SetUsername(profile.Username))
        dispatch(SetPassword(profile.Password))
        dispatch(SetName(profile.Name))
        dispatch(SetPhone(profile.Phone))
        dispatch(SetAddress(profile.Address))
        dispatch(SetLatitude(profile.Latitude))
        dispatch(SetLongitude(profile.Longitude))
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])

    return (
        <Wrapper >
            <Sidebar>
                <SidebarItem
                    to='/merchant/dashboard'
                    text='Dashboard'
                    icon='bx bxs-dashboard'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/product'
                    text='Product'
                    icon='bx bx-box'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/driver'
                    text='Driver'
                    icon='bx bx-user'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/order'
                    text='Order'
                    icon='bx bx-shopping-bag'
                    active={false}
                />
                <SidebarItem
                    to='/merchant/profile'
                    text='Profile'
                    icon='bx bx-id-card'
                    active={true}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Profle</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/merchant/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='#' className='active'>Profile</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>
                    <CardContent>
                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Data Profile</DataTitle>
                        </div>
                        <hr className='my-5' />
                        <div className='mb-3 w-full'>
                            <InputLabel>Email</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Email}
                                onChange={(e) => {
                                    dispatch(SetEmail(e.currentTarget.value))
                                }}
                                placeholder='email'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Username</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Username}
                                onChange={(e) => {
                                    dispatch(SetUsername(e.currentTarget.value))
                                }}
                                placeholder='username'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Password</InputLabel>
                            <InputPasswordIcon
                                value={StateMerchantProfile.Password}
                                onChange={(e) => {
                                    dispatch(SetPassword(e.currentTarget.value))
                                }}
                                icon='bx bx-lock-alt'
                                placeholder='password'
                                withShowPassword
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Nama Lengkap</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Name}
                                onChange={(e) => {
                                    dispatch(SetName(e.currentTarget.value))
                                }}
                                placeholder='nama lengkap'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>No. Hp</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Phone}
                                onChange={(e) => {
                                    dispatch(SetPhone(e.currentTarget.value))
                                }}
                                placeholder='no. hp'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Alamat</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Address}
                                onChange={(e) => {
                                    dispatch(SetAddress(e.currentTarget.value))
                                }}
                                placeholder='alamat'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Latitude</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Latitude}
                                onChange={(e) => {
                                    dispatch(SetLatitude(e.currentTarget.value))
                                }}
                                placeholder='latitude'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Longitude</InputLabel>
                            <InputText
                                value={StateMerchantProfile.Longitude}
                                onChange={(e) => {
                                    dispatch(SetLongitude(e.currentTarget.value))
                                }}
                                placeholder='longitude'
                            />
                        </div>
                        <hr className='my-3' />
                        <div className='flex w-full justify-end'>
                            <ButtonSave
                                onClick={() => {
                                    onSubmit()
                                }}
                                onLoading={StateMerchantProfile.LoadingSave}
                            >
                                <i className='bx bx-save me-3'></i>
                                <span>Simpan</span>
                            </ButtonSave>
                        </div>
                    </CardContent>
                </ContentContainer>
            </ContentWrapper>
            <ToastContainer
                hideProgressBar
            />
        </Wrapper>
    )
}

export default MerchantProfileSourcePage

const ButtonSave = styled(ButtonPrimary)`
    width: fit-content;
    font-size: 0.8em;
    padding: 0.75rem 2rem;
`

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

const DataTitle = styled.p`
    margin-bottom: 0;
    color: ${ColorPallete.dark};
    font-weight: bold;
    font-size: 1em;
`

const CardContent = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: fit-content;
    width: 100%;
    border-radius: 8px;
    padding: 1rem 1rem;
`
const HeaderContainer = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
`

const HeaderTitle = styled.p`
    margin-bottom: 0;
    font-size: 1em;
    color: ${ColorPallete.dark};
    font-weight: bold;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`

const ContentWrapper = styled.div`
    padding-left: 260px;
    height: 100vh;
    width: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
`