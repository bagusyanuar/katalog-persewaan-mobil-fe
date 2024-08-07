'use client'

import React from 'react'
import styled from 'styled-components'

interface IProps {
    children?: React.ReactNode
    className?: string
}

const StyledCard = styled.div`
    background-color: white;
    padding: 1.5rem 1.5rem;
    border-radius: 12px;
    width: fit-content;
    height: fit-content;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const Card: React.FC<IProps> = ({
    children,
    className = ''
}) => {
    return (
        <StyledCard className={className}>
            {children}
        </StyledCard>
    )
}

export default Card