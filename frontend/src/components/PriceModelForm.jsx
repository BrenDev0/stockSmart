import React, { useState } from 'react'
import styled from 'styled-components'
import { useModelsContext } from '../context/ModelsContext';
import { modelKey, quoteKey } from '../keys';

const PriceModelForm = () => {
    const { companies, setCompanies } = useModelsContext()
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    
    const addToModel = async (i) => {
        const res = await Promise.all([
          fetch(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${i.toUpperCase()}?apikey=${modelKey}`
          ),
          fetch(
            `https://finnhub.io/api/v1/quote?symbol=${i.toUpperCase()}&token=${quoteKey}`
          )
        ]);
    
        const data = await Promise.all(res.map((r) => r.json()));
      
        setCompanies([
          ...companies,
          {
            ticker: i.toUpperCase(),
            price: data[1].c,
            mc: data[0][0].marketCapTTM / 1000000,
            tbv: data[0][0].marketCapTTM / data[0][0].ptbRatioTTM / 1000000,
            fcf: data[0][0].marketCapTTM / data[0][0].pfcfRatioTTM / 1000000,
            rev: data[0][0].marketCapTTM / data[0][0].priceToSalesRatioTTM / 1000000,
            ni: data[0][0].marketCapTTM / data[0][0].peRatioTTM / 1000000,
            roe: data[0][0].roeTTM * 100,
            roic: data[0][0].roicTTM * 100,
            ptb: data[0][0].ptbRatioTTM,
            ps: data[0][0].priceToSalesRatioTTM,
            pe: data[0][0].peRatioTTM < 0 ? 0 : data[0][0].peRatioTTM,
            pfcf: data[0][0].pfcfRatioTTM < 0 ? 0 : data[0][0].pfcfRatioTTM,
          },
        ]);
        setSearch("");
      };

  return (
    <PriceModelFormStyled>
      <form onSubmit={(e) => {
        e.preventDefault()
        addToModel(search)
      }}>
        <label htmlFor="search">Model Title:</label>
        <div className="input-con">
          <input type="text" id="search" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label htmlFor="search">Add company to model:</label>
        <div className="input-con">
          <input type="text" id="search" placeholder='search...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="button-con">
          <button type='submit'>
            <i className="fa-solid fa-magnifying-glass-plus"></i>
          </button>
        </div>
      </form>
    </PriceModelFormStyled>
  )
}

const PriceModelFormStyled = styled.div`
    background: var(--red);
    padding: 10px;
    border-radius: 7px;

    input {
      border-radius: 5px;
      text-align: left;
      padding: 5px;
    }

    .input-con {
      padding: 5px;
    }

    .fa-magnifying-glass-plus {
      color: var(--dark)
    }

    button{
      width: 75px;
    }

    .button-con {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
` 

export default PriceModelForm
