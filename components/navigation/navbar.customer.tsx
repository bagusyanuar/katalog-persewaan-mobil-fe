'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MainLogo from '@/public/assets/images/logo.png'
import NavbarLink from '@/components/link/link.navbar'
import NavbarLinkAction from '@/components/link/link.action.navbar'


const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;

    img {
        height: 45px;
        width: auto;
    }
`

const LinkContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`

const LinkActionContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`

interface Iprops {
    isAuth: boolean
}

const NavbarCustomer: React.FC<Iprops> = ({ isAuth }) => {
    const router = useRouter();

    const handleClickProfile = () => {
        if (isAuth) {
            router.push('/member/profile');
        } else {
            router.push('/member');
        }
        
    }

    const handleClickCart = () => {
        router.push('/cart')
    }

    return (
        <Container>
            <Image src={MainLogo} alt='img-logo' priority />
            <LinkContainer>
                <NavbarLink to='/' text='Beranda' />
                <NavbarLink to='/about' text='Tentang Kami' />
                <NavbarLink to='/contact' text='Kontak' />
            </LinkContainer>
            <LinkActionContainer>
                {
                    isAuth ?
                        <>
                            <NavbarLinkAction icon='bx-cart' onClick={handleClickCart} />
                            <NavbarLinkAction icon='bx-user' onClick={handleClickProfile} />
                        </>
                        :
                        <>
                            <NavbarLinkAction icon='bx-user' onClick={handleClickProfile} />
                        </>
                }

            </LinkActionContainer>
        </Container>
    )
}

export default NavbarCustomer