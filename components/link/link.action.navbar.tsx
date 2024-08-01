'use client'

import React from 'react'
import styled from 'styled-components'
import { ColorPallete } from '../color'

const Container = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: ${ColorPallete.darkTint.tint20};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ease-in-out 200ms;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    i {
        color: ${ColorPallete.darkTint.tint20};
    }
`

interface IProps {
    icon: string
    onClick?: () => void
}

const NavbarLinkAction: React.FC<IProps> = ({
    icon,
    onClick = () => { }
}) => {
    return (
        <Container onClick={onClick}>
            <i className={`bx ${icon}`}></i>
        </Container>
    )
}

export default NavbarLinkAction