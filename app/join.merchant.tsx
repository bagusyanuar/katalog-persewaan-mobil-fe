'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ColorPallete } from '@/components/color'
import JoinImage from '@/public/assets/images/hero-join.png'

const Wrapper = styled.div`
    width: 100%;
    height: 400px;
    background-color: ${ColorPallete.accent};
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
`

const LeftContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1rem;
    /* background-color: red; */
`
const RightContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        height: 400px;
        width: auto;
    }
`

const GreetingTextTitle = styled.h1`
    font-size: 2.5rem;
    color: ${ColorPallete.accent};
    font-weight: 700;
    color: white;
    margin-bottom: 0;
`

const GreetingTextDescription = styled.p`
    font-size: 1em;
    color: white;
    text-align: justify;
    margin-bottom: 0;
`

const ButtonJoin = styled.a`
    background-color: ${ColorPallete.primary};
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
`

const JoinMerchantSection: React.FC = () => {
    return (
        <div className='p-5'>
            <Wrapper>
                <LeftContainer className='ps-5'>
                    <GreetingTextTitle>
                        Gabung Menjadi Merchant
                    </GreetingTextTitle>
                    <GreetingTextDescription>
                        Dapatkan Keuntungan Dengan Menjadi Merchant Kami.
                    </GreetingTextDescription>
                    <ButtonJoin href='/merchant/register'>
                        Gabung Sekarang
                    </ButtonJoin>
                </LeftContainer>
                <RightContainer>
                    <Image src={JoinImage} alt='img-hero' priority />
                </RightContainer>
            </Wrapper>
        </div>
    )
}

export default JoinMerchantSection