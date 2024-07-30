import React from 'react'
import styled from 'styled-components'
import { money } from '../utils/money.format'


const PricingTable = ({data, ps, pe, pfcf}) => {
    
  return (
    <PricingTableStyled>
        <thead>
            <tr>
                <th>Ticker</th>
                <th>Current price</th>
                <th>PS</th>
                <th>PE</th>
                <th>PFCF</th>
                <th>Average All</th>
                <th>Average PE/PFCF</th>
                <th>Average PS/PE</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((company) => {
                    let shares = company.mc / company.price
                    let toSales = (company.rev * ps) / shares
                    let toEarnings = (company.ni * pe) / shares
                    let toFcf = (company.fcf * pfcf) / shares
                    let avgAll = (toSales + toEarnings + toFcf) / 3 
                    let avgPePfcf = (toEarnings + toFcf) / 2
                    let avgPsPe = (toSales + toEarnings) /2

                    return (
                        <tr>
                            <td>{company.ticker}</td>
                            <td>{money.format(company.price)}</td>
                            <td>{money.format(toSales)}</td>
                            <td>{money.format(toEarnings)}</td>
                            <td>{money.format(toFcf)}</td>
                            <td>{money.format(avgAll)}</td>
                            <td>{money.format(avgPePfcf)}</td>
                            <td>{money.format(avgPsPe)}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </PricingTableStyled>
  )
}

const PricingTableStyled = styled.table`
    background: var(--dark);
    

    th{
        text-align: left;
    }

    th, td {
        padding: 5px
    }

    tr:nth-child(odd){
        background-color: var(--dark) ;
    }
    
    tr:nth-child(even){
        background-color: var(--light) ;
    }
`

export default PricingTable
