import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'
import {money} from '../utils/money.format'


const Table = () => {
    const { incomeStatement } = useValuationContext()
  return (
    <TableStyled>
        <thead>
            <tr>
                <th></th>
                {
                    incomeStatement.years.map((year) => {
                        return(
                            <th>{year}</th>
                        )
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                incomeStatement.kv.map((kv) => {
                    return (
                        <tr>
                            <td>{kv.key}</td>
                            {
                                kv.values.map((value) => {
                                    return (
                                        <td>{money.format(value)}</td>
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
