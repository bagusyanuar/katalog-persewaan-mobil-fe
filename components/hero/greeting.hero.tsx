'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Image from 'next/image'
import HeroImage from '@/public/assets/images/hero.png'
import { ColorPallete } from '../color'

const Container = styled.div`
    width: 100%;
    height: 400px;
    background-color: ${ColorPallete.primary};
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
        height: 250px;
        width: auto;
    }
`
const GreetingTextTitle = styled.h1`
    font-size: 3.5em;
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

const ButtonJoin = styled.button`
    background-color: ${ColorPallete.accent};
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
`

const GreetingHero = () => {
    const router = useRouter();

    return (
        <Container>
            <LeftContainer>
                <GreetingTextTitle>
                    CAR RENT
                </GreetingTextTitle>
                <GreetingTextDescription>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s
                </GreetingTextDescription>
                <ButtonJoin onClick={() => {
                    router.push('/member/auth/register')
                 }}>
                    Join Now
                </ButtonJoin>
            </LeftContainer>
            <RightContainer>
                <Image src={HeroImage} alt='hero-image' priority />
            </RightContainer>
        </Container>
    )
}

export default GreetingHero