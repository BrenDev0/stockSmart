import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import { modelKey } from '../keys'

const CompanyValuation = () => {
    const { search, incomeStatement, balanceSheet, cashflowStatement } = useValuationContext()
    const [metric, setMetric] = useState('')
    const [terminalValue, setTerminalValue] = useState('')
  return (
    <ValueStyled>
        <caption>Valuation</caption>
        <thead>
            <tr>
                <th>
                    <select name="metric" id="metric-select" value={metric} onChange={(e) => setMetric(e.target.value)}>
                        <option value="">Select Metric</option>
                        <option value="net-income">Net Income</option>
                        <option value="free-cashflow">Free Cashflow</option>
                    </select>
                </th>
                <th>Growth Rate</th>
                <th>
                    <select name="terminal-value" id="tv-select" value={terminalValue} onChange={(e) => setTerminalValue(e.target.value)}>
                        <option value="">Select Terminal Value</option>
                        <option value="exit-multiple">Exit Multiple</option>
                        <option value="perpetuity-growth">Perpetuity Growth</option>
                    </select>
                </th>
                <th>Discount Rate</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <input type="number" />
                </td>
                <td>
                    <input type="number" />
                </td>
                <td>
                    <input type="number" />
                </td>
                <td>
                    <input type="number" />
                </td>
            </tr>
        </tbody>
    </ValueStyled>
  )
}

const ValueStyled = styled.table`
    margin-top: 15px;
    background-color: var(--red);
    padding: 25px;
    
    th {
        text-align: left;
    }

    td{
        text-align: left;
    }

    select {
        color: var(--dark)
    }

    option {
        color: var(--dark)
    }

    input {
        width: 25%;
        height: 25px;
        border-radius: 5px
    }
    caption{
        color: var(--dark);
        font-size: 2rem;
        
    }
`
    


export default CompanyValuation
