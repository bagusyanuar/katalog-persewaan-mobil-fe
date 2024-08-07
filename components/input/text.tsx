'use client'

import React, { useId } from 'react'
import styled from 'styled-components'
import { ColorPallete } from '@/components/color'


interface IProps {
    value: string
    id?: string
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    placeholder?: string
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
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



const InputText: React.FC<IProps> = ({
    value,
    id,
    name,
    onChange = (e) => { },
    className = '',
    placeholder = '',
}) => {
    const inputID = `input-field-${useId()}`

    return (
        <Container className={className}>
            <InputContainer>
                <StyledInput
                    type='text'
                    id={id || inputID}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </InputContainer>
        </Container>
    )
}

export default InputText