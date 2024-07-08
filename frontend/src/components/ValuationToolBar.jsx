import React from 'react'
import styled from 'styled-components'
import { useValuationContext } from '../context/ValuationContext'

const ValuationToolBar = () => {
    const { search, setSearch } = useValuationContext()
  return (
    <ToolbarStyled>
        <div id="serach">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    </ToolbarStyled>
  )
}

const ToolbarStyled = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    border: 1px solid black

`

export default ValuationToolBar
