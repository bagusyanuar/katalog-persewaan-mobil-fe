'use client'

import React from 'react'
import styled from 'styled-components'
import { ColorPallete } from '../color'

const BreadcrumbContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      font-size: 0.8rem;
      font-weight: bold;
      color: ${ColorPallete.dark};

      &.active {
        color: ${ColorPallete.darkTint.tint30};
        font-weight: 600;
      }
    } 

    span {
      font-size: 0.8em;
      color: ${ColorPallete.dark};
    }
`

interface IProps {
    children: React.ReactNode
}
const BreadcrumbWrapper: React.FC<IProps> = ({ children }) => {
    return (
        <BreadcrumbContainer>
            {children}
        </BreadcrumbContainer>
    )
}

export default BreadcrumbWrapper