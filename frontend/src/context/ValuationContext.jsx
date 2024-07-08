import { createContext, useContext, useState } from "react";


const ValuationContext = createContext()

export const ValuationProvider = ({children}) => {
    const [search, setSearch] = useState('')

    return (
        <ValuationContext.Provider
            value={{
                search,
                setSearch
            }}
        >
            {children}
        </ValuationContext.Provider>
    )
}

export const useValuationContext = () => useContext(ValuationContext)