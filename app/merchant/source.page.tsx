'use client'

import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ColorPallete } from '@/components/color'
import LoginImage from '@/public/assets/images/login-image.jpg'
import InputTextIcon from '@/components/input/text.icon'
import InputPasswordIcon from '@/components/input/password.icon'
import ButtonPrimary from '@/components/button/button.loading'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    MerchantLoginState,
    Reset,
    SetEmail,
    SetPassword
} from '@/redux/merchant/login/slice'
import { submit } from '@/redux/merchant/login/action'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${ColorPallete.primary};
    display: flex;
    align-items: center;
    justify-content: center;
`

const CardLogin = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: 350px;
    width: 650px;
    border-radius: 8px;
    display: flex;
`

const LeftPanel = styled.div`
    width: 350px;
    height: 100%;
    /* background-color: red; */
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 100%;
        width: auto;
        object-fit: cover;
        object-position: center center;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
`

const RightPanel = styled.div`
    width: 300px;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
`

const LoginTitle = styled.p`
    margin-bottom: 1rem;
    color: ${ColorPallete.darkTint.tint20};
    font-size: 0.8em;
    font-weight: bold;
`

const ButtonLogin = styled(ButtonPrimary)`
    width: 100%;
`

const RegisterPanel = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    color: ${ColorPallete.darkTint.tint30};

    span {
        margin-right: 0.25rem;
    }
`

const RegisterLink = styled.a`
    text-decoration: none;
    color: ${ColorPallete.primary};
    cursor: pointer;
    font-weight: bold;
`

const MerchantLoginPage: React.FC = () => {
    const StateMerchantLogin = useAppSelector(MerchantLoginState)
    const dispatch = useAppDispatch()

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetEmail(e.currentTarget.value))
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetPassword(e.currentTarget.value))
    }

    const onSubmit = () => {
        dispatch(submit()).then(response => {
            const payload: APIResponse = response.payload as APIResponse
            switch (payload.code) {
                case 200:
                    showToast(<ToastContent theme='success' text={payload.message} />,
                        {
                            timeToClose: 2000,
                            onClose: () => {
                                window.location.href = '/merchant/dashboard'
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
        dispatch(Reset());
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])
    return (
        <Container>
            <CardLogin>
                <LeftPanel>
                    <Image src={LoginImage} alt='img-logo' priority />
                </LeftPanel>
                <RightPanel>
                    <LoginTitle>Sign in to your account</LoginTitle>
                    <InputTextIcon
                        icon='bx bx-envelope'
                        value={StateMerchantLogin.Email}
                        placeholder='email'
                        onChange={onChangeEmail}
                    />
                    <InputPasswordIcon
                        value={StateMerchantLogin.Password}
                        onChange={onChangePassword}
                        icon='bx bx-lock-alt'
                        placeholder='password'
                        withShowPassword
                    />
                    <ButtonLogin
                        onClick={() => { onSubmit() }}
                        onLoading={StateMerchantLogin.LoadingLogin}
                    >
                        Login
                    </ButtonLogin>
                    <RegisterPanel>
                        <span className='me-1'>Belum punya akun?</span>
                        <RegisterLink href='/merchant/register'>Daftar</RegisterLink>
                    </RegisterPanel>
                </RightPanel>
            </CardLogin>
            <ToastContainer
                hideProgressBar
            />
        </Container>
    )
}

export default MerchantLoginPage