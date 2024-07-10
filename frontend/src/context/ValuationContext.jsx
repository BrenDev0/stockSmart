import { createContext, useContext, useState } from "react";
import { modelKey } from "../keys";


const ValuationContext = createContext()

export const ValuationProvider = ({children}) => {
    const [search, setSearch] = useState('')
    const [incomeStatement, setIncomeStatement] = useState({
        years: '',
        kv: []
    })

    const getData = () => {
        fetch(`https://financialmodelingprep.com/api/v3/income-statement/${search}?period=annual&apikey=${modelKey}`)
        .then((res) => res.json())
        .then((data) => {
            //get the years for table head
               const years = data.map((year) => {
               return year.calendarYear
               })

               const keys = []
               

            //get the keys
               data.map((year) => {
                for (const [key, value] of Object.entries(year)) {
                    if (typeof value === 'number' && keys.includes(key) === false) {
                        keys.push(key)
                    }
                }
               })
               
               const array = []

               keys.forEach((key) => {
                const set = {
                    key: key,
                    values: []
                }
                for (let i = 0; i < data.length; i++){
                    set.values.push(data[i][key])
                }
                array.push(set) 
            })
            setIncomeStatement({
                years: years,
                kv: array
            })
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