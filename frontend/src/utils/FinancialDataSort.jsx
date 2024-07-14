import React from 'react'

export const FinancialDataSort = (data) => {
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

 return {
    ticker: data[0].symbol,
    currency: data[0].reportedCurrency,
    years: years,
    data: array
}
}


