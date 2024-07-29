import React from 'react'
import styled from 'styled-components'
import { money } from '../utils/money.format'


const PricingTable = (data, ps, pe, pfcf) => {
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

                    return (
                        <tr>
                            <td>{company.ticker}</td>
                            <td>{money.format(company.price)}</td>
                            <td>{money.format(toSales)}</td>
                            <td>{money.format(toEarnings)}</td>
                            <td>{money.format(toFcf)}</td>
                            <td>{money.format(avgAll)}</td>
                            <td>{money.format(avgPePfcf)}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </PricingTableStyled>
  )
}

const PricingTableStyled = styled.table``

export default PricingTable
