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


const NavbarCustomer = () => {

    const router = useRouter();

    const handleClickProfile = () => {
        router.push('/member');
    }

    return (
        <Container>
            <Image src={MainLogo} alt='img-logo' priority />
            <LinkContainer>
                <NavbarLink to='/' text='Beranda' />
                <NavbarLink to='/' text='Tentang Kami' />
                <NavbarLink to='/' text='Kontak' />
            </LinkContainer>
            <LinkActionContainer>
                <NavbarLinkAction icon='bx-user' onClick={handleClickProfile} />
            </LinkActionContainer>
        </Container>
    )
}

export default NavbarCustomer