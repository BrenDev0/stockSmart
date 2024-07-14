import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import { modelKey } from '../keys'

const CompanyValuation = () => {
    const { search, incomeStatement, balanceSheet, cashflowStatement } = useValuationContext()

  return (
    <ValueStyled>
        <span>Valuation</span>
        <div className="options">
            <div className="pairs">
                <label htmlFor="growth-rate">Growth Rate</label>
                <input type="percent" />
            </div>
            <div className="pairs">
                <select name="" id="">
                    <option value="Exit-Multiple">Exit Multiple</option>
                    <option value="Terminal-Value">Terminal Value</option>
                </select>
                <input type="number" />
            </div>
        </div>
    </ValueStyled>
  )
}

const ValueStyled = styled.div`
    background: var(--red);

.options {
    height: 75px;
    display: flex;
    justify-content: space-around;
    align-items: center;

}

.pairs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

select {
    color: var(--dark);
}

option {
    color: var(--dark);
}
`

export default CompanyValuation
