'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import InputText from '@/components/input/text'
import InputTextArea from '@/components/input/textarea'
import ButtonPrimary from '@/components/button/button.loading'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import InputFile from '@/components/input/dropzone'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantDriverState,
    SetPrice,
    SetName,
    SetID,
    SetPhone,
    Reset
} from '@/redux/merchant/driver/slice'
import { MerchantDriverRequest, MerchantDriver } from '@/model/driver'
import InputLabel from '@/components/label/label'
import { patchDriver } from '@/redux/merchant/driver/action'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';

interface IProps {
    data: MerchantDriver
}
const EditDriverSourcePage: React.FC<IProps> = ({ data }) => {
    const StateMerchantDriver = useAppSelector(MerchantDriverState)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [thumbnail, setThumbnail] = useState<File | null>(null)

    const onReceiveFiles = (files: File[]) => {
        if (files.length > 0) {
            setThumbnail(files[0])
        } else {
            setThumbnail(null)
        }
    }

    const onSubmit = () => {

        let driverRequest: MerchantDriverRequest = {
            ID: data.ID,
            Name: StateMerchantDriver.Name,
            Phone: StateMerchantDriver.Phone,
            Price: StateMerchantDriver.Price,
            Image: thumbnail
        }

        dispatch(patchDriver({ req: driverRequest })).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 1000,
                            onClose: () => {
                                window.location.href = '/merchant/driver'
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
        dispatch(SetID(data.ID))
        dispatch(SetName(data.Name))
        dispatch(SetPhone(data.Phone))
        dispatch(SetPrice(data.Price))

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
                    active={true}
                />
                <SidebarItem
                    to='/merchant/order'
                    text='Order'
                    icon='bx bx-shopping-bag'
                    active={false}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Tambah Product</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/merchant/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='/merchant/driver'>Driver</a>
                            <span>/</span>
                            <a href='#' className='active'>Edit</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>
                    <CardContent>
                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Form Data Driver</DataTitle>
                        </div>
                        <hr className='my-5' />
                        <div className='mb-3 w-full'>
                            <InputLabel>Nama Driver</InputLabel>
                            <InputText
                                value={StateMerchantDriver.Name}
                                onChange={(e) => {
                                    dispatch(SetName(e.currentTarget.value))
                                }}
                                placeholder='Nama Driver'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>No. HP</InputLabel>
                            <InputText
                                value={StateMerchantDriver.Phone}
                                onChange={(e) => {
                                    dispatch(SetPhone(e.currentTarget.value))
                                }}
                                placeholder='no. hp'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Harga (Rp.)</InputLabel>
                            <InputText
                                value={StateMerchantDriver.Price.toString()}
                                onChange={(e) => {
                                    if (e.currentTarget.value === '') {
                                        dispatch(SetPrice(0))
                                    } else {
                                        dispatch(SetPrice(parseInt(e.currentTarget.value)))
                                    }

                                }}
                                placeholder='0'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Gambar</InputLabel>
                            <InputFile
                                label='Thumbnail'
                                onReceiveFiles={onReceiveFiles}
                                multiple={false}
                                maxSize={1000000}
                            />
                        </div>
                        <hr className='my-3' />
                        <div className='flex w-full justify-end'>
                            <ButtonSave
                                onClick={() => {
                                    onSubmit()
                                }}
                                onLoading={StateMerchantDriver.LoadingSaveDriver}
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

export default EditDriverSourcePage

const ButtonSave = styled(ButtonPrimary)`
    width: fit-content;
    font-size: 0.8em;
    padding: 0.75rem 2rem;
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
