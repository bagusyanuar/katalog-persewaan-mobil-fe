'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ColorPallete } from '../color'

const Container = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${ColorPallete.primary};
    padding: 0.5rem 1.5rem;
    font-size: 0.8em;
    font-weight: 600;
    transition: all ease-in-out 200ms;
    border-radius: 8px;

    &:hover {
        background-color: ${ColorPallete.primary};
        color: white;
    }
`

interface IProps {
    text: string,
    to: string,
    className?: string
}

const NavbarLink: React.FC<IProps> = ({
    text,
    to,
    className = ''
}) => {
  return (
    <Container href={to} className={className}>
        {text}
    </Container>
  )
}

export default NavbarLink