import { money } from '../utils/money.format'

export const cashflowValuator = (freeCashflow, growthRate, discountRate, terminalValueType, terminalValue, cash, debt) => {
        let fcf = freeCashflow
        let npv = 0
        const growth = growthRate / 100
        const discount = discountRate / 100

        for (let i = 1; i < 11; i++){
            fcf = fcf * (1 + growth)
            let discountFactor = (1 + discount) ** i
            npv = npv + (fcf / discountFactor)
        }
        let discountFactor = (1 + discount) ** 10
        if ( terminalValueType === 'exit-multiple'){
            fcf = fcf * terminalValue;
            npv = npv + (fcf / discountFactor)
        }

        if ( terminalValueType === 'perpituity-growth') {
             const tv = terminalValue / 100
            fcf = fcf * ((1 + tv) / (discount - tv))
            npv = npv + (fcf / discountFactor)
        }
        
        return npv + cash - debt       
}

export const netIncomeValuator = (revenue, margin, growthRate, discountRate, terminalValueType, terminalValue, cash, debt) => {
   let  rev = revenue
    let ni = 0 
    let npv = 0
    const growth = growthRate / 100
    const discount = discountRate / 100
    const netMargin = margin / 100

    for (let i = 1; i < 11; i++){
        rev = rev * (1 + growth)
        let discountFactor = (1 + discount) ** i
        ni = rev * netMargin 
        npv = npv + (ni / discountFactor)
    }
    let discountFactor = (1 + discount) ** 10
    if (terminalValueType === 'exit-multiple') {
        ni = ni * terminalValue
        npv = npv + (ni / discountFactor)
    }

    if (terminalValueType === 'perpetuity-growth'){
        const tv = terminalValue / 100
        ni = ni * ((1 + tv) / (discount - tv))
        npv = npv + (ni / discountFactor)
    }

    return npv + cash - debt
}