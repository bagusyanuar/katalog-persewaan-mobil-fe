'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import LogoImage from '@/public/assets/images/logo.png'

const Wrapper = styled.div`
    width: 260px;
    height: 100vh;
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
            <ItemWrapper>
                {children}
            </ItemWrapper>
        </ImageWrapper>
    </Wrapper>
  )
}

export default Sidebar