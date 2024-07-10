import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'

const ValuationToolBar = () => {
    const { search, setSearch, getData, statement, setStatement } = useValuationContext()
    
  return (
    <ToolbarStyled>
        <div id="search">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass" onClick={getData}></i>
        </div>
        <select name="fstatement" id="statement" value={statement} onChange={(e) => {
            setStatement(e.target.value);
        }}>
            <option value="income-statement" onClick={getData} >Income Statement</option>
            <option value="balance-sheet-statement" onClick={getData}>Balance Sheet</option>
            <option value="cash-flow-statement"n onClick={getData}>Cashflow Statement</option>
        </select>
        y
    </ToolbarStyled>
  )
}

const ToolbarStyled = styled.div`
    width: 100%;
    height: 10%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;

    #search {
        flex-basis: 25%;
        display: flex;
        align-items: center;
    }

    select {
        padding: 5px;
        color: var(--dark)

    }

    option {
        color: var(--dark)
    }

    input {
        border: 1px solid var(--red);
    }

    .fa-magnifying-glass {
        color: var(--red);
        margin-left: 10px;
    }

    .fa-magnifying-glass:hover {
        cursor: pointer;
    }

`

export default ValuationToolBar
