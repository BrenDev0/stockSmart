import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import {money} from '../utils/money.format'


const Table = () => {
    const { statement, setStatement } = useValuationContext()
  return (
    <TableStyled>
        <thead>
            <tr>
                <th>{statement.ticker} -- {statement.currency} in millions </th>
                {
                    statement.years.map((year) => {
                        return(
                            <th key={year}>{year}</th>
                        )
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                statement.data.map((kv) => {
                    return (
                        <tr key={Math.random()}>
                            <td key={Math.random()}>{kv.key}</td>
                            {
                                kv.key.includes('Ratio') ?

                                    kv.values.map((value) => {
                                        return (
                                            <td key={Math.random()}>{Math.round(value * 100)}%</td>
                                        )
                                    }) :

                                    kv.key.includes('eps') ?

                                        kv.values.map((value) => {
                                            return (
                                                <td key={Math.random()}>{money.format(value)}</td>
                                            )
                                        }) :

                                    kv.key.includes('ShsOut') ? 
                                    
                                        kv.values.map((value) => {
                                            return (
                                                <td key={Math.random()}>{new Intl.NumberFormat().format(value/1000000)}</td>
                                            )
                                        }) :
                                    
                                        kv.values.map((value) => {
                                            return (
                                                <td key={Math.random()}>{money.format(value/1000000)}</td>
                                            )
                                        })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    </TableStyled>
  )
}

const TableStyled = styled.table`

background-color: var(--dark);

td {
    padding: 5px;
}

tr:nth-child(odd){
    background-color: var(--dark) ;
}
tr:nth-child(even){
    background-color: var(--light) ;
}

tr:nth-child(even) td {
    color: var(--dark);
}



`

export default Table
