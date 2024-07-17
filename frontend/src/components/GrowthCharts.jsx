import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   Bar 
} from 'recharts'
import { useValuationContext } from '../context/ValuationContext'

const GrowthCharts = () => {
    const { incomeStatement, balanceSheet, cashflowStatement } = useValuationContext()
    const [data, setData] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        let chartData = []
        for (let i = 0; i < incomeStatement.years.length; i++){
            chartData.unshift({
                name: incomeStatement.years[i],
                revenue: incomeStatement.data.find((kv) => kv.key === 'revenue').values[i] /1000000,
                netIncome: incomeStatement.data.find((kv) => kv.key === 'netIncome').values[i] / 1000000,
                fcf: cashflowStatement.data.find((kv) => kv.key === 'freeCashFlow').values[i] /1000000
            })
            
        }
        setData(chartData)
    }, [incomeStatement, balanceSheet, cashflowStatement])
  return (
    <ChartsStyled>
        <span className='title'>Growth Visuals</span>
        <p> --{incomeStatement.currency}-- in millions</p>
        <div className="data">
            <BarChart width={1000} height={300} data={data}>
                <CartesianGrid />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='revenue' fill='blue' />
                <Bar dataKey='netIncome' fill='red' />
                <Bar dataKey='fcf' fill='green' />
            </BarChart>
            <table>
                <caption>Growth Metrics</caption>
                <thead>
                    <th>
                        <select name="" id="">
                            <option>---Income Statement----</option>
                                {
                                    incomeStatement.data.map((kv) => {
                                        return (
                                            <option value={kv.key} onClick={() => {
                                                let data = [...tableData]
                                                data.push({
                                                    key: kv.key,
                                                    tyg: (kv.values[0] / kv.values[2] - 1) / 3,
                                                    fyg: (kv.values[0] / kv.values[4] - 1) / 5
                                                })

                                                setTableData(data)
                                            }}>{kv.key}</option>
                                        )
                                    })
                                }
                            <option>---Balance Sheet---</option>
                                {
                                    balanceSheet.data.map((kv) => {
                                        return (
                                            <option value={kv.key} onClick={() => {
                                                let data = [...tableData]
                                                data.push({
                                                   key: kv.key,
                                                   tyg: (kv.values[0] / kv.values[2] - 1) / 3,
                                                   fyg: (kv.values[0] / kv.values[4] - 1) / 5 
                                                })

                                                setTableData(data)
                                            }}>{kv.key}</option>
                                        )
                                    })
                                }
                            <option>---Cashflow Statement---</option>
                                {
                                    cashflowStatement.data.map((kv) => {
                                        return (
                                            <option value={kv.key} onClick={() => {
                                                let data = [...tableData]
                                                data.push({
                                                    key: kv.key,
                                                    tyg: (kv.values[0] / kv.values[2] - 1) / 3,
                                                    fyg: (kv.values[0] / kv.values[4] - 1) / 5
                                                })

                                            setTableData(data)
                                        }}>{kv.key}</option>
                                    )
                                })
                            }
                        </select>
                    </th>
                    <th>5 Year Growth</th>
                    <th>3 Year Growth</th>
                </thead>
                <tbody>
                    {
                        tableData.map((data) => {
                            return (
                                <tr>
                                    <td>{data.key}</td>
                                    <td>{Math.round(data.fyg * 100)}%</td>
                                    <td>{Math.round(data.tyg * 100)}%</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </ChartsStyled>
  )
}

const ChartsStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;

    .title {
        font-size: 2rem;
    }

    .data {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    select, option {
        color: var(--dark)
        
    }

    span, p, caption {
    color: var(--dark);
  }

  tspan {
    font-size: 10px;
  }

  table{
    background: var(--light);
    padding: 20px;
    margin: 10px 0 10px 0
  }

  th, td {
    padding: 15px
  }

`

export default GrowthCharts
