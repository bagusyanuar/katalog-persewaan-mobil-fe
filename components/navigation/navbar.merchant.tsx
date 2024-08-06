'use client'

import React from 'react'
import styled from 'styled-components'
import NavbarLinkAction from '@/components/link/link.action.navbar'
import { ColorPallete } from '../color'


const NavbarMercant = () => {
    return (
        <Container>
            <LinkActionContainer>
                <NavbarLinkAction icon='bx-power-off' onClick={() => { }} />
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