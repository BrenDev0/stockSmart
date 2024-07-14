import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import { modelKey } from '../keys'

const CompanyValuation = () => {
    const { search, financialData } = useValuationContext()


  return (
    <ValueStyled>

    </ValueStyled>
  )
}

const ValueStyled = styled.div``

export default CompanyValuation
