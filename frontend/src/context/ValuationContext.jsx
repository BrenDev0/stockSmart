import { createContext, useContext, useState } from "react";
import { modelKey } from "../keys";


const ValuationContext = createContext()

export const ValuationProvider = ({children}) => {
    const [search, setSearch] = useState('')
    const [incomeStatement, setIncomeStatement] = useState([])

    const getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/income-statement/${search}?period=annual&apikey=${modelKey}`)
        .then((res) => res.json())
        .then((data) => {
               let array = data.map((year) => {
                return {
                    year: year.calendarYear,
                    data: year
                }
               })
               setIncomeStatement(array)
        })
    }

    return (
        <ValuationContext.Provider
            value={{
                search,
                setSearch,
                getData,
                incomeStatement,
            }}
        >
            {children}
        </ValuationContext.Provider>
    )
}

export const useValuationContext = () => useContext(ValuationContext)