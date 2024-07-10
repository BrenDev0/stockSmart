import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'


const Table = () => {
    const { incomeStatement } = useValuationContext()
  return (
    <TableStyled>
        <thead>
            <tr>
                <th></th>
                {
                    incomeStatement.map((year) => {
                        return(
                            <th>{year.year}</th>
                        )
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                incomeStatement.map((year) => {
                    
                })
            }
        </tbody>
    </TableStyled>
  )
}

const TableStyled = styled.table`

background-color: var(--light);



`

export default Table
