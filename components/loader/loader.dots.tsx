'use client'

import React from 'react'
import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'

const Container = styled.div<{ $height: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${({ $height }) => $height};
`

interface IProps {
    height?: string
    className?: string
}
const LoaderDots: React.FC<IProps> = ({
    height = '20rem',
    className = ''
}) => {
    return (
        <Container className={className} $height={height}>
            <p>Please wait for a moment...</p>
            <ThreeDots
                color='#EB7223'
                height={20}
                width={45}
                radius={4}
            />
        </Container>
    )
}

export default LoaderDots

