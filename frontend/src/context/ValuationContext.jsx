import { createContext, useContext, useState } from "react";
import { modelKey } from "../keys";
import { useGlobalContext } from "./GlobalContext";


const ValuationContext = createContext()

export const ValuationProvider = ({children}) => {
    const { setError } = useGlobalContext()
    const [search, setSearch] = useState('')
    const [statement, setStatement] = useState('income-statement')
    const [financialData, setFinancialData] = useState({
        currency: '',
        years: '',
        data: []
    })

    const getData = () => {
        try {
            fetch(`https://financialmodelingprep.com/api/v3/${statement}/${search}?period=annual&apikey=${modelKey}`)
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
            setFinancialData({
                currency: data[0].reportedCurrency,
                years: years,
                data: array
            })
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
                financialData,
                statement, 
                setStatement
            }}
        >
            {children}
        </ValuationContext.Provider>
    )
}

export const useValuationContext = () => useContext(ValuationContext)