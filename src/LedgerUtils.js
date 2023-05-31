import axios, { all } from "axios"
import { baseUrl } from "./index"

export const calculateActiveLedgers = (allLedgers) => {
    var totalActive = 0
    allLedgers.map(eachLedger => {
        if (eachLedger.active)
            totalActive += 1
    })
    return totalActive
}

export const calculateNonActiveLedgers = (allLedgers) => {
    var totalNonActive = 0
    allLedgers.map(eachLedger => {
        if (!eachLedger.active)
            totalNonActive += 1
    })
    return totalNonActive
}

export const calculateNegativeLedgers = (allLedgers) => {
    var totalNegative = 0
    allLedgers.map (eachLedger => {
        axios.get(`${baseUrl}/transaction/ledger/${eachLedger.uid}`).then(result => {
            const total = result.data.reduce ((accumulator, eachTransc) => {
                return eachTransc.credit ? accumulator + eachTransc.amount : accumulator - eachTransc.amount
            }, 0)
            console.log(total);
            if (total < 0) {
                console.log("Entered Here" + total);
                totalNegative += 1
                console.log(totalNegative);
            }
        })
    })
    console.log(totalNegative);
    return totalNegative
}