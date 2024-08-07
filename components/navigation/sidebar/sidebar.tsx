'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import LogoImage from '@/public/assets/images/logo.png'

const Wrapper = styled.div`
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    border-right: 1px solid gray;
    display: flex;
    flex-direction: column;
`

const ImageWrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 80px;
        width: auto;
    }
`

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    gap: 0.5rem;
`

interface IProps {
    children?: React.ReactNode
}
const Sidebar: React.FC<IProps> = ({
    children
}) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={LogoImage} alt='img-logo' priority />
            </ImageWrapper>
            <ItemWrapper>
                {children}
            </ItemWrapper>
        </Wrapper>
    )
}

export default Sidebar