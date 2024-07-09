import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'

const ValuationToolBar = () => {
    const { search, setSearch, getData } = useValuationContext()
    
  return (
    <ToolbarStyled>
        <div id="search">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass" onClick={getData}></i>
        </div>
    </ToolbarStyled>
  )
}

const ToolbarStyled = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    border: 1px solid black;

    #search {
        flex-basis: 25%;
        display: flex;
        align-items: center;
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
