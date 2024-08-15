import React, { useState } from 'react'
import styled from 'styled-components'
import { useModelsContext } from '../context/ModelsContext';
import { modelKey, quoteKey, detailKey} from '../keys';
import { money } from '../utils/money.format';

const PriceModelForm = () => {
    const { companies, newPriceModel, setCompanies, pricingModels, setLoadingModel, findModel, updateModel} = useModelsContext()
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState("")
    
    const saveModel = async () => {
      try {
        if (!title) {
          return setError("Please add title to save model");
        }

        await newPriceModel({
          name: title,
          data: companies.map((com) => {
            return {
              ticker: com.ticker
            }
          })
        });
        setCompanies([]);
        setError('')
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    const loadModel = async (id) => {
      setLoadingModel(true);
      const model = await findModel(id);
      const updatedData = [];
      for (let i = 0; i < model.data.length; i++) {
        const res = await Promise.all([
          fetch(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${model.data[i].ticker.toUpperCase()}?apikey=${modelKey}`
          ),
          fetch(
            `https://finnhub.io/api/v1/quote?symbol=${model.data[i].ticker.toUpperCase()}&token=${quoteKey}` 
          ),
          fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${model.data[i].ticker.toUpperCase()}&token=${quoteKey}`
          )
        ]);
  
        const data = await Promise.all(res.map((r) => r.json()));

        let marketCap = data[0][0].marketCapTTM

        if (data[2].country !== "US") {
          const response = await fetch(
            `https://api.polygon.io/v3/reference/tickers/${model.data[i].ticker.toUpperCase()}?apiKey=${detailKey}`
          )

          const conversionData = await response.json()

          marketCap = conversionData.results.market_cap
        }
        
        
        updatedData.push({
          ticker: model.data[i].ticker.toUpperCase(),
          price: data[1].c,
          mc: marketCap / 1000000,
          fcf: marketCap / data[0][0].pfcfRatioTTM / 1000000,
          rev: marketCap / data[0][0].priceToSalesRatioTTM / 1000000,
          ni: marketCap / data[0][0].peRatioTTM / 1000000,
          ps: data[0][0].priceToSalesRatioTTM,
          pe: data[0][0].peRatioTTM < 0 ? 0 : data[0][0].peRatioTTM,
          pfcf: data[0][0].pfcfRatioTTM < 0 ? 0 : data[0][0].pfcfRatioTTM
        });
      }
  
      setCompanies(
        updatedData.sort((a, b) => a.ticker.localeCompare(b.ticker))
      );
      setTitle(model.name)
      setLoadingModel(false);
    };

    const addToModel = async (i) => {
        const res = await Promise.all([
          fetch(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${i.toUpperCase()}?apikey=${modelKey}`
          ),
          fetch(
            `https://finnhub.io/api/v1/quote?symbol=${i.toUpperCase()}&token=${quoteKey}`
          ),
          fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${i.toUpperCase()}&token=${quoteKey}`
          )
        ]);
    
        const data = await Promise.all(res.map((r) => r.json()));

        let marketCap = data[0][0].marketCapTTM

        if (data[2].country !== "US") {
          const response = await fetch(
            `https://api.polygon.io/v3/reference/tickers/${i.toUpperCase()}?apiKey=${detailKey}`
          )

          const conversionData = await response.json()

          marketCap = conversionData.results.market_cap
        }
        
       
        setCompanies([
          ...companies,
          {
            ticker: i.toUpperCase(),
            price: data[1].c,
            mc: marketCap / 1000000,
            fcf: marketCap / data[0][0].pfcfRatioTTM / 1000000,
            rev: marketCap / data[0][0].priceToSalesRatioTTM / 1000000,
            ni: marketCap / data[0][0].peRatioTTM / 1000000,
            ps: data[0][0].priceToSalesRatioTTM,
            pe: data[0][0].peRatioTTM < 0 ? 0 : data[0][0].peRatioTTM,
            pfcf: data[0][0].pfcfRatioTTM < 0 ? 0 : data[0][0].pfcfRatioTTM
          },
        ]);
        setSearch("");
      };

  return (
    <PriceModelFormStyled>
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <select name="select" id="model-select">
          <option value="select-a-model">Load Model</option>
          {
            pricingModels.map((model) => {
              return (
                <option value={model.id} key={model._id} onClick={() => loadModel(model._id)}>{model.name}</option>
              )
            })
          }
        </select>
        <p>Model Title:</p>
        <div className="input-con">
          <input type="text" required id="search" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </form>
      <label htmlFor="search">Add company to model:</label>
        <div className="input-con">
          <input type="text" id="search" placeholder='search...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="button-con">
          <button onClick={saveModel}>Save</button>
          <button onClick={() => {
            setCompanies([])
            setTitle('')
          }}>Clear</button>
          <button onClick={() => addToModel(search)}>
            <i className="fa-solid fa-magnifying-glass-plus"></i>
          </button>
        </div>
        {
          error && <span>{error}</span>
        }
    </PriceModelFormStyled>
  )
}

const PriceModelFormStyled = styled.div`
    background: var(--red);
    padding: 10px;
    border-radius: 7px;

    input, select{
      border-radius: 5px;
      text-align: left;
      padding: 5px;
    }

    select, option {
      color: var(--dark);
    }

    .input-con {
      padding: 5px;
    }

    .fa-magnifying-glass-plus {
      color: var(--dark)
    }

    button {
      width: 65px;
      color: var(--dark)
    }

    .button-con {
      width: 100%;
      padding: 5px 0 5px 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
` 

export default PriceModelForm
