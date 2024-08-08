'use client'

import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ColorPallete } from '@/components/color'
import LoginImage from '@/public/assets/images/login-image.jpg'
import InputTextIcon from '@/components/input/text.icon'
import InputPasswordIcon from '@/components/input/password.icon'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
    RegisterState,
    SetEmail,
    SetPassword,
    SetUsername,
    SetName,
    SetPhone,
    SetAddress,
    Reset
} from '@/redux/register/slice'
import { submit } from '@/redux/register/action'
import { RegisterMerchantRequest } from '@/model/auth'
import ButtonPrimary from '@/components/button/button.loading'
import { showToast, ToastContent } from '@/components/toast'
import { APIResponse } from '@/lib/util'
import { ToastContainer } from 'react-toastify';



const RegisterMemberPage = () => {

    const StateRegister = useAppSelector(RegisterState)
    const dispatch = useAppDispatch()

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetEmail(e.currentTarget.value))
    }

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetUsername(e.currentTarget.value))
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetPassword(e.currentTarget.value))
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetName(e.currentTarget.value))
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetPhone(e.currentTarget.value))
    }

    const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SetAddress(e.currentTarget.value))
    }


    const onSubmit = () => {
        let request: RegisterMerchantRequest = {
            Email: StateRegister.Email,
            Username: StateRegister.Username,
            Password: StateRegister.Password,
            Name: StateRegister.Name,
            Phone: StateRegister.Phone,
            Address: StateRegister.Address,
            Latitude: '',
            Longitude: '',
        }
        dispatch(submit({ req: request })).then(response => {
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

    const initialPage = useCallback(() => {
        dispatch(Reset());
    }, [])

    useEffect(() => {
        initialPage()
        return () => { }
    }, [initialPage])

    return (
        <Container>
            <CardRegister>
                <LeftPanel>
                    <Image src={LoginImage} alt='img-logo' priority />
                </LeftPanel>
                <RightPanel>
                    <LoginTitle>Register new account</LoginTitle>
                    <InputTextIcon
                        icon='bx bx-envelope'
                        value={StateRegister.Email}
                        placeholder='email'
                        onChange={onChangeEmail}
                    />
                    <InputPasswordIcon
                        value={StateRegister.Password}
                        onChange={onChangePassword}
                        icon='bx bx-lock-alt'
                        placeholder='password'
                        withShowPassword
                    />
                    <InputTextIcon
                        icon='bx bx-user'
                        value={StateRegister.Username}
                        placeholder='username'
                        onChange={onChangeUsername}
                    />
                    <InputTextIcon
                        icon='bx bx-id-card'
                        value={StateRegister.Name}
                        placeholder='nama lengkap'
                        onChange={onChangeName}
                    />
                    <InputTextIcon
                        icon='bx bx-phone'
                        value={StateRegister.Phone}
                        placeholder='handphone'
                        onChange={onChangePhone}
                    />
                    <InputTextIcon
                        icon='bx bx-home'
                        value={StateRegister.Address}
                        placeholder='alamat'
                        onChange={onChangeAddress}
                    />
                    <ButtonLogin
                        onLoading={StateRegister.LoadingRegister}
                        onClick={() => { onSubmit() }}
                    >
                        Register
                    </ButtonLogin>
                    <LoginPanel>
                        <span className='me-1'>Sudah punya akun?</span>
                        <LoginLink href='/member/auth'>Login</LoginLink>
                    </LoginPanel>
                </RightPanel>
            </CardRegister>
            <ToastContainer
                hideProgressBar
            />
        </Container>
    )
}

export default RegisterMemberPage

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${ColorPallete.primary};
    display: flex;
    align-items: center;
    justify-content: center;
`

const CardRegister = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: 550px;
    width: 750px;
    border-radius: 8px;
    display: flex;
`

const LeftPanel = styled.div`
    width: 400px;
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
    width: 350px;
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

const LoginPanel = styled.div`
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

const LoginLink = styled.a`
    text-decoration: none;
    color: ${ColorPallete.primary};
    cursor: pointer;
    font-weight: bold;
`