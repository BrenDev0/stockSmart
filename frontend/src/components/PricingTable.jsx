import React from 'react'
import styled from 'styled-components'
import { money } from '../utils/money.format'
import { useModelsContext } from '../context/ModelsContext'


const PricingTable = () => {

    const { companies, medianPs, medianPe, medianPfcf } = useModelsContext()
    
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
                companies.map((company) => {
                    let shares = company.mc / company.price
                    let toSales = (company.rev * medianPs) / shares
                    let toEarnings = (company.ni * medianPe) / shares
                    let toFcf = (company.fcf * medianPfcf) / shares
                    let avgAll = (toSales + toEarnings + toFcf) / 3 
                    let avgPePfcf = (toEarnings + toFcf) / 2
                    let avgPsPe = (toSales + toEarnings) /2

                    return (
                        <tr key={company.ticker}>
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
    max-height: 100%;
    width: 100%;
    

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
