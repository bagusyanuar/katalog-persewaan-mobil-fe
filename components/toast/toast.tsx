'use client'

import React from 'react'
import styled from 'styled-components'
import { ToastContentProps } from 'react-toastify'
import { ColorPallete } from '@/components/color'
import 'react-toastify/ReactToastify.css';

const generateTheme = ($theme: TTheme): string => {
    let value: string = ''
    switch ($theme) {
        case 'error':
            value = 'var(--danger-color)'
            break;
        case 'warning':
            value = 'var(--warning-color)'
            break;
        case 'info':
            value = 'var(--info-color)'
            break;
        default:
            value = 'var(--success-color)'
            break;
    }
    return value
}

const Container = styled.div<{ $theme: TTheme }>`
    display: flex;
    align-items: center;
    height: fit-content;
    min-height: 60px;
    width: 100%;

    .spacer-color {
        height: 100%;
        width: 10px;
        background-color: ${({ $theme }) => generateTheme($theme)};
        min-height: 80px;
        margin-right: 0.5rem;
    }

    .content-wrapper {
        display: flex;
        align-items: start;
        width: 100%;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        
        .icon-wrapper {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            margin-left: 0.5rem;

            i {
                color: ${({ $theme }) => generateTheme($theme)};
                font-size: 1.8rem;
            }
        }

        .close-button-wrapper {
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 1rem;
            margin-right: 0.75rem;

            a {
                i {
                color: ${ColorPallete.light};
                font-size: 1.5rem;
                }

                &:hover {
                color: ${ColorPallete.light};
                }
            }
        }

        .notification-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            .title {
                font-weight: 600;
                color: ${ColorPallete.darkTint.tint20};
                font-size: 1em;
                margin-bottom: 0.1rem;
                line-height: 1;
            }

            .description {
                color: ${ColorPallete.light};
                font-size: 0.8em;
            }
        }
    }
`

export type TTheme = 'success' | 'error' | 'info' | 'warning'

interface IProps {
    theme: TTheme
    text?: string
}

const Toast: React.FC<Partial<ToastContentProps> & IProps> = ({
    theme,
    closeToast,
    toastProps,
    text = ''
}) => {

    const handleCloseToast = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (closeToast) {
            closeToast()
        }
    }

    let title: string = ''
    switch (theme) {
        case 'success':
            title = 'Success'
            break;
        case 'error':
            title = 'Error'
            break;
        case 'warning':
            title = 'Warning'
            break;
        case 'info':
            title = 'Information'
            break;
        default:
            break;
    }

    return (
        <Container $theme={theme}>
            <div className='spacer-color'></div>
            <div className='content-wrapper'>
                <div className='icon-wrapper'>
                    <i className='bx bxs-check-circle'></i>
                </div>
                <div className='notification-content'>
                    <span className='title'>{title}</span>
                    <span className='description'>{text}</span>
                </div>
                <div className='close-button-wrapper'>
                    <a href='#' onClick={handleCloseToast}>
                        <i className='bx bx-x'></i>
                    </a>
                </div>
            </div>
        </Container>
    )
}

export default Toast