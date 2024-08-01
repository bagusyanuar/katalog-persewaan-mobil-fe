'use client'

import React, { HTMLInputTypeAttribute, useId, useState } from 'react'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'

const StyledInput = styled.input`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-right: 0.75rem;
    padding-left: 0.5rem;
    width: 100%;
    font-size: 0.8em;
    border-radius: 5px;
    color: ${ColorPallete.dark};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${ColorPallete.light};
    }
`

const StyledIcon = styled.i`
    background-color: transparent;
    margin-left: 0.5rem;
    color: ${ColorPallete.light};
    transition: all ease-in-out 200ms;
`

const StyledShowPasswordIcon = styled.i`
    background-color: transparent;
    margin-right: 0.5rem;
    color: ${ColorPallete.light};
    transition: all ease-in-out 200ms;
    cursor: pointer;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${ColorPallete.light};
    border-radius: 5px;
    width: 100%;
    transition: all ease-in-out 200ms;
    
    &:focus-within {
        border-color: ${ColorPallete.lightShades.shade20};

        ${StyledIcon} {
            color: ${ColorPallete.dark};
        }
    }
`

const StyledErrorText = styled.span`
    font-size: 0.7em;
    padding: 2px 2px;
    color: ${ColorPallete.danger};
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

interface IProps {
    value: string
    icon: string
    id?: string
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    placeholder?: string
    withShowPassword?: boolean
}

const InputPasswordIcon: React.FC<IProps> = ({
    value,
    icon,
    id,
    name,
    onChange = (e) => { },
    className = '',
    placeholder = '',
    withShowPassword = false
}) => {
    const inputID = `password-field-${useId()}`
    const [type, setType] = useState<HTMLInputTypeAttribute>('password')
    const [showIcon, setShowIcon] = useState<string>('bx bx-show')

    const handleChangeType = () => {
        if (type === 'text') {
            setType('password')
            setShowIcon('bx bx-show')
        }

        if (type === 'password') {
            setType('text')
            setShowIcon('bx bx-low-vision')
        }
    }

    return (
        <Container className={className}>
            <InputContainer>
                <StyledIcon className={icon} />
                <StyledInput
                    type={type}
                    id={id || inputID}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {
                    withShowPassword
                        ?
                        <StyledShowPasswordIcon className={showIcon} onClick={handleChangeType} />
                        :
                        <></>
                }
            </InputContainer>
        </Container>
    )
}

export default InputPasswordIcon