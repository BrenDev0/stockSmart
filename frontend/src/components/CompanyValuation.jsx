import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import { modelKey } from '../keys'
import { money } from '../utils/money.format'
import { cashflowValuator, netIncomeValuator } from '../utils/Valuators'

const CompanyValuation = () => {
    const { search, incomeStatement, balanceSheet, cashflowStatement, details } = useValuationContext()
    const [metric, setMetric] = useState('net-income')
    const [terminalValue, setTerminalValue] = useState('exit-multiple')
    const [cash, setCash] = useState(balanceSheet.data.find((kv) => kv.key === "cashAndShortTermInvestments"))
    const [debt, setDebt] = useState(balanceSheet.data.find((kv) => kv.key === 'totalDebt'))
    const [revenue, setRevenue] = useState(incomeStatement.data.find((kv) => kv.key === 'revenue'))
    const [netMargin, setNetMargin] = useState(Math.round(incomeStatement.data.find((kv) => kv.key === 'netIncomeRatio').values[0] * 100))
    const [freeCashflow, setFreeCashflow] = useState(cashflowStatement.data.find((kv) => kv.key === 'freeCashFlow'))
    const [growthRate, setGrowthRate] = useState('')
    const [discountRate, setDiscountRate] = useState('')
    const [tv, setTv] = useState('')

    useEffect(() => {
      setCash(balanceSheet.data.find((kv) => kv.key === "cashAndShortTermInvestments"))
      setDebt(balanceSheet.data.find((kv) => kv.key === 'totalDebt'))
      setRevenue(incomeStatement.data.find((kv) => kv.key === 'revenue'))
      setFreeCashflow(cashflowStatement.data.find((kv) => kv.key === 'freeCashFlow'))
      setNetMargin(Math.round(incomeStatement.data.find((kv) => kv.key === 'netIncomeRatio').values[0] * 100))
    }, [incomeStatement, balanceSheet, cashflowStatement])
  return (
    <ValueStyled>
       <div className="model-title"><span>Valuation</span></div>
        <div className="tables">
          <table className="model-table" id='model-options'>
            <caption>Model Options</caption>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Terminal value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select name="metric" id="metric-select" onChange={(e) => {
                    setMetric(e.target.value)
                  }}>
                    <option value="net-income">Net Income</option>
                    <option value="free-cashflow">Free Cashflow</option>
                  </select>
                </td>
                <td>
                  <select name="terminal-value" id="terminal-value-select"  onChange={(e) => {
                    setTv('')
                    setTerminalValue(e.target.value)
                  }}>
                    <option value="exit-multiple">Exit Multiple</option>
                    <option value="perpetuity-growth">Perpetuity Growth</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="model-table" id='model-inputs'>
            <caption>Model Inputs</caption>
            <thead>
              <tr>
                <th>Keys</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Growth %</td>
                <td>
                  <input type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Terminal Value {terminalValue === 'perpetuity-growth' && '%'}</td>
                <td>
                  <input type="number" value={tv} onChange={(e) => setTv(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Discount Rate %</td>
                <td>
                  <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} /> 
                </td>
              </tr>
              {
                metric === 'net-income' &&
                <tr>
                  <td>Net Margin %</td>
                  <td>
                    <input type="number" value={netMargin} onChange={(e) => setNetMargin(e.target.value)} />
                  </td>
                </tr>
              }
            </tbody>
          </table>
          <table className='model-table' id='model-data'>
            <caption>Model Data</caption>
            <thead>
              <tr>
                <th>Cash</th>
                <th>Debt</th>
                <th>Shares</th>
                <th>Current Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{money.format(cash.values[0] / 1000000)}</td>
                <td>{money.format(debt.values[0] / 1000000)}</td>
                <td>{new Intl.NumberFormat().format(details.results.weighted_shares_outstanding / 1000000)}</td>
                <td>{money.format((details.results.market_cap / details.results.weighted_shares_outstanding))}</td>
                {
                  growthRate && discountRate && tv && 
                  <td>
                  {
                    metric === 'free-cashflow' ?
                    money.format(cashflowValuator(freeCashflow.values[0], growthRate, discountRate, terminalValue, tv, cash.values[0], debt.values[0]) / details.results.weighted_shares_outstanding)
                    : money.format(netIncomeValuator(revenue.values[0], netMargin, growthRate, discountRate,terminalValue, tv, cash.values[0], debt.values[0])/ details.results.weighted_shares_outstanding)
                  }
                </td>
                }
              </tr>
            </tbody>
          </table>
        </div>
    </ValueStyled>
  )
}

const ValueStyled = styled.div`
  width: 100%;

    input {
      
      height: 25px;
      border-radius: 5px;
      
    }

    td, th {
      text-align: left;
      padding: 5px;
    }

    .tables {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
    }
    .model-title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .model-title span {
      color: var(--dark);
      font-size: 2rem;
    }

    .model-table {
      background: var(--red);
      padding: 15px;
      border-radius: 7px
    }

    select, option, caption {
      color: var(--dark)
    }

   
   
`
    


export default CompanyValuation
