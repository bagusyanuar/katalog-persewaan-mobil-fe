'use client'

import React from 'react'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'

const Container = styled.button`
    background-color: ${ColorPallete.primary};
    color: white;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2.5rem;
    border-radius: 8px;
    cursor: pointer;

`

interface IProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}
const ButtonPrimary: React.FC<IProps> = ({
    children,
    onClick = () => { },
    className = ''
}) => {
    return (
        <Container className={className} onClick={onClick}>
            {children}
        </Container>
    )
}

export default ButtonPrimary