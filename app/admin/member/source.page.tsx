'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/navigation/sidebar/sidebar'
import SidebarItem from '@/components/navigation/sidebar/sidebar.item'
import NavbarMerchant from '@/components/navigation/navbar.merchant'
import ButtonPrimary from '@/components/button/button.primary'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'
import BreadcrumbWrapper from '@/components/breadcrumb/wrapper'
import LoaderDots from '@/components/loader/loader.dots'
import DataTable, { TableColumn } from 'react-data-table-component'
import ModalConfirmation from '@/components/modal/modal.confirmation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    AdminMemberState,
    SetLoadingMember
} from '@/redux/admin/member/slice'
import { getMemberList } from '@/redux/admin/member/action'
import { Member } from '@/model/member'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';

const DriverSourcePage: React.FC = () => {
    const StateAdminMember = useAppSelector(AdminMemberState)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [modal, setModal] = useState<boolean>(false)

    const columns: TableColumn<Member>[] = [
        {
            name: 'Email',
            selector: row => row.Email,
        },
        {
            name: 'Username',
            selector: row => row.Username,
        },
        {
            name: 'Nama',
            selector: row => row.Name,
        },
        {
            name: 'No. Hp',
            cell: row => {
                return row.Phone
            }
        },
        {
            name: 'Alamat',
            cell: row => {
                return row.Address
            }
        },
    ]

    const initialPage = useCallback(async () => {
        dispatch(getMemberList());
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])
    return (
        <Wrapper >
            <Sidebar>
                <SidebarItem
                    to='/admin/dashboard'
                    text='Dashboard'
                    icon='bx bxs-dashboard'
                    active={false}
                />
                <SidebarItem
                    to='/admin/member'
                    text='Member'
                    icon='bx bx-user'
                    active={true}
                />
                <SidebarItem
                    to='/admin/merchant'
                    text='Merchant'
                    icon='bx bx-group'
                    active={false}
                />
            </Sidebar>
            <ContentWrapper>
                <NavbarMerchant />
                <ContentContainer>
                    <HeaderContainer>
                        <HeaderTitle>Halaman Member</HeaderTitle>
                        <BreadcrumbWrapper>
                            <a href='/admin/dashboard'>Dashboard</a>
                            <span>/</span>
                            <a href='#' className='active'>Member</a>
                        </BreadcrumbWrapper>
                    </HeaderContainer>

                    <CardContent>
                        <div className='flex justify-between items-center w-full'>
                            <DataTitle>Data Member</DataTitle>
                        </div>
                        <hr className='my-5' />
                        <DataTable
                            columns={columns}
                            data={StateAdminMember.Members}
                            pagination
                            progressPending={StateAdminMember.LoadingMember}
                            progressComponent={<LoaderDots className='h-80' />}
                            persistTableHead={true}
                        />
                    </CardContent>
                </ContentContainer>
            </ContentWrapper>
            <ToastContainer
                hideProgressBar
            />
        </Wrapper>
    )
}

export default DriverSourcePage

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