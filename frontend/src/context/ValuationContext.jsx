import { createContext, useContext, useState } from "react";
import { modelKey } from "../keys";
import { useGlobalContext } from "./GlobalContext";
import { FinancialDataSort } from "../utils/FinancialDataSort";


const ValuationContext = createContext()

export const ValuationProvider = ({children}) => {
    const { setError } = useGlobalContext()
    const [search, setSearch] = useState('')
    const [incomeStatement, setIncomeStatement] = useState({
        ticker:'',
        currency: '',
        years: '',
        data: []
    })
    const [balanceSheet, setBalanceSheet] = useState({
        ticker:'',
        currency: '',
        years: '',
        data: []
    })
    const [cashflowStatement, setCashflowStatement] = useState({
        ticker:'',
        currency: '',
        years: '',
        data: []
    })
    const [statement, setStatement] = useState({
        ticker:'',
        currency: '',
        years: '',
        data: []
    })

    const getData = () => {
        try {
            Promise.all([
                fetch(`https://financialmodelingprep.com/api/v3/income-statement/${search}?period=annual&apikey=${modelKey}`),
                fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${search}?period=annual&apikey=${modelKey}`),
                fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${search}?period=annual&apikey=${modelKey}`),
            ])
            .then((responses) => {
                return Promise.all(responses.map((res) => res.json()))
            })
            .then((data) => {
                setIncomeStatement(FinancialDataSort(data[0]))
                setBalanceSheet(FinancialDataSort(data[1]))
                setCashflowStatement(FinancialDataSort(data[2]))
                setStatement(FinancialDataSort(data[0]))
                
        })
        

    
        
        } catch (error) {
            setError(error)
        }
    }

    return (
        <ValuationContext.Provider
            value={{
                search,
                setSearch,
                getData,
                statement, 
                setStatement,
                incomeStatement,
                balanceSheet,
                cashflowStatement
            }}
        >
            {children}
        </ValuationContext.Provider>
    )
}

export const useValuationContext = () => useContext(ValuationContext)