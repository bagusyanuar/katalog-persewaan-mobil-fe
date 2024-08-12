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
    MerchantProductState,
    SetDescription,
    SetLoadingProduct,
    SetPrice,
    SetName,
    SetVehicleNumber,
    Reset
} from '@/redux/merchant/product/slice'
import { ProductRequest } from '@/model/product'
import InputLabel from '@/components/label/label'
import { createProduct } from '@/redux/merchant/product/action'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';


const AddProductSourcePage: React.FC = () => {
    const StateMerchantProduct = useAppSelector(MerchantProductState)
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

        if (thumbnail !== null) {
            let productRequest: ProductRequest = {
                ID: 0,
                Name: StateMerchantProduct.Name,
                VehicleNumber: StateMerchantProduct.VehicleNumber,
                Price: StateMerchantProduct.Price,
                Description: StateMerchantProduct.Description,
                Image: thumbnail
            }

            dispatch(createProduct({ req: productRequest })).then(response => {
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
        } else {
            showToast(<ToastContent theme='error' text={`Please Attach Image`} />,
                {
                    timeToClose: 1000,
                })
        }

    }

    const initialPage = useCallback(() => {
        dispatch(Reset());
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
                    active={true}
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
                            <a href='/merchant/product'>Product</a>
                            <span>/</span>
                            <a href='#' className='active'>Tambah</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>
                    <CardContent>
                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Form Data Product</DataTitle>
                        </div>
                        <hr className='my-5' />
                        <div className='mb-3 w-full'>
                            <InputLabel>Nama Product</InputLabel>
                            <InputText
                                value={StateMerchantProduct.Name}
                                onChange={(e) => {
                                    dispatch(SetName(e.currentTarget.value))
                                }}
                                placeholder='Nama Product'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Plat Nomor</InputLabel>
                            <InputText
                                value={StateMerchantProduct.VehicleNumber}
                                onChange={(e) => {
                                    dispatch(SetVehicleNumber(e.currentTarget.value))
                                }}
                                placeholder='Nama Product'
                            />
                        </div>
                        <div className='mb-3 w-full'>
                            <InputLabel>Harga (Rp.)</InputLabel>
                            <InputText
                                value={StateMerchantProduct.Price.toString()}
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
                            <InputLabel>Deskripsi</InputLabel>
                            <InputTextArea
                                value={StateMerchantProduct.Description}
                                onChange={(e) => {
                                    dispatch(SetDescription(e.currentTarget.value))
                                }}
                                placeholder=''
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
                                onLoading={StateMerchantProduct.LoadingSaveProduct}
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

export default AddProductSourcePage

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
