import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import {money} from '../utils/money.format'


const Table = () => {
    const { financialData } = useValuationContext()
  return (
    <TableStyled>
        <thead>
            <tr>
                <th></th>
                {
                    financialData.years.map((year) => {
                        return(
                            <th key={year}>{year}</th>
                        )
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                financialData.data.map((kv) => {
                    return (
                        <tr>
                            <td>{kv.key}</td>
                            {
                                kv.values.map((value) => {
                                    return (
                                        <td key={Math.random()}>{money.format(value)}</td>
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
