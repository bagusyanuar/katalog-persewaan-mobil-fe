'use client'

import React from 'react'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'

const StyledButton = styled.button<{ $theme: TTheme, $fill: TFill }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $theme, $fill }) => generateColor($theme, $fill).background};
    color: ${({ $theme, $fill }) => generateColor($theme, $fill).color};;
    padding: 0.4rem 0.6rem;
    font-size: 0.8em;
    border-radius: 5px;
    transition: all ease-in-out 200ms;
    border: 1px solid ${({ $theme, $fill }) => generateColor($theme, $fill).border};

    &:hover {
        background-color: ${({ $theme, $fill }) => generateColor($theme, $fill).hoverBackground};
        color: ${({ $theme, $fill }) => generateColor($theme, $fill).hoverColor};
    }
`

type TBackground = {
    background: string
    hoverBackground: string
    border: string
    color: string
    hoverColor: string
}

const generateColor = ($theme: TTheme, $fill: TFill): TBackground => {
    let background: TBackground = {
        background: ColorPallete.primary,
        hoverBackground: ColorPallete.primary,
        border: ColorPallete.primary,
        color: 'white',
        hoverColor: 'white'
    }

    if ($fill === 'outline') {
        background = {
            background: 'white',
            hoverBackground: ColorPallete.primary,
            border: ColorPallete.primary,
            color: ColorPallete.primary,
            hoverColor: ColorPallete.primary
        }
    }
    switch ($theme) {
        case 'accent':
            if ($fill === 'outline') {
                background = {
                    background: 'white',
                    hoverBackground: ColorPallete.accent,
                    border: ColorPallete.accent,
                    color: ColorPallete.accent,
                    hoverColor: 'white'
                }
            } else {
                background = {
                    background: ColorPallete.accent,
                    hoverBackground: ColorPallete.accent,
                    border: ColorPallete.accent,
                    color: 'white',
                    hoverColor: 'white'
                }
            }
            break;
        case 'danger':
            if ($fill === 'outline') {
                background = {
                    background: 'white',
                    hoverBackground: ColorPallete.danger,
                    border: ColorPallete.primary,
                    color: ColorPallete.primary,
                    hoverColor: 'white'
                }
            } else {
                background = {
                    background: ColorPallete.danger,
                    hoverBackground: ColorPallete.danger,
                    border: ColorPallete.danger,
                    color: 'white',
                    hoverColor: 'white'
                }
            }
            break;
        case 'success':
            if ($fill === 'outline') {
                background = {
                    background: 'white',
                    hoverBackground: ColorPallete.success,
                    border: ColorPallete.success,
                    color: ColorPallete.success,
                    hoverColor: 'white'
                }
            } else {
                background = {
                    background: ColorPallete.success,
                    hoverBackground: ColorPallete.success,
                    border: ColorPallete.success,
                    color: 'white',
                    hoverColor: 'white'
                }
            }
            break;
        case 'info':
            if ($fill === 'outline') {
                background = {
                    background: 'white',
                    hoverBackground: ColorPallete.info,
                    border: ColorPallete.info,
                    color: ColorPallete.info,
                    hoverColor: 'white'
                }
            } else {
                background = {
                    background: ColorPallete.info,
                    hoverBackground: ColorPallete.info,
                    border: ColorPallete.info,
                    color: 'white',
                    hoverColor: 'white'
                }
            }
            break;
        case 'warning':
            if ($fill === 'outline') {
                background = {
                    background: 'white',
                    hoverBackground: ColorPallete.warning,
                    border: ColorPallete.warning,
                    color: ColorPallete.warning,
                    hoverColor: 'white'
                }
            } else {
                background = {
                    background: ColorPallete.warning,
                    hoverBackground: ColorPallete.warning,
                    border: ColorPallete.warning,
                    color: 'white',
                    hoverColor: 'white'
                }
            }
            break;
        default:
            break;
    }
    return background
}

type TTheme = 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
type TFill = 'fill' | 'outline'

interface IProps {
    children: React.ReactNode
    type?: TTheme
    fill?: TFill
    className?: string
    onClick?: () => void
}

const Button: React.FC<IProps> = ({
    children,
    type = 'primary',
    fill = 'fill',
    onClick = () => { },
    className = ''
}) => {
    return (
        <StyledButton
            className={className}
            onClick={onClick}
            $theme={type}
            $fill={fill}
        >
            {children}
        </StyledButton>
    )
}

export default Button