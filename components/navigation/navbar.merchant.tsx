'use client'

import React from 'react'
import styled from 'styled-components'
import NavbarLinkAction from '@/components/link/link.action.navbar'
import { ColorPallete } from '../color'
import { LogoutState } from '@/redux/logout/slice'
import { submit } from '@/redux/logout/action'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';


const NavbarMercant = () => {
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
    return (
        <Container>
            <LinkActionContainer>
                <NavbarLinkAction icon='bx-power-off' onClick={() => {
                    onLogout()
                 }} />
            </LinkActionContainer>
        </Container>
    )
}

export default NavbarMercant

const Container = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 2.5rem;
    border-bottom: 1px solid ${ColorPallete.darkTint.tint20};

    img {
        height: 45px;
        width: auto;
    }
`

const LinkActionContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`