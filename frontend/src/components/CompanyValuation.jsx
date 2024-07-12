import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import { modelKey } from '../keys'

const CompanyValuation = () => {
    const { search, financialData } = useValuationContext()

    const [incomeStatement, setIncomeStatement] = useState({})
    const [balanceSheet, setBalanceSheet] = useState({})
    const [cashflowStatement, setCashflowStatement] = useState({}) 

    useEffect(() => {
        Promise.all(
            [
                fetch(`https://financialmodelingprep.com/api/v3/income-statement/${search}?period=annual&apikey=${modelKey}`),
                fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${search}?period=annual&apikey=${modelKey}`),
                fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${search}?period=annual&apikey=${modelKey}`)
            ])
            .then((responses) => {
                return Promise.all(responses.map((res) => res.json()))
            })
            .then((data) => {
                setIncomeStatement(data[0])
                setBalanceSheet(data[1])
                setCashflowStatement(data[2])
            })
    }, [financialData])

  return (
    <ValueStyled>

    </ValueStyled>
  )
}

const ValueStyled = styled.div``

export default CompanyValuation
