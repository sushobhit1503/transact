
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

export const calculateNegativeLedgers = (allLedgers, allTransc) => {
    const totalNegativeLedgers = allLedgers.reduce ((count, ledger) => {
        const {_id} = ledger
        const transcObjects = allTransc.filter(transc => transc.ledger === _id)
        const sum = transcObjects.reduce ((acc, transc) => {
            if (transc.credit)
                return acc + transc.amount
            else
                return acc - transc.amount
        }, 0)
        if (sum < 0)
            return count + 1
        return count
    }, 0)
    return totalNegativeLedgers
}

export const calculateAllLedgers = (allLedgers, allTransc) => {
    var calculateLedgers = allLedgers.map(ledger => {
        const {_id, name, active} = ledger
        const transcObjects = allTransc.filter (transc => transc.ledger === _id)
        const debit = transcObjects.reduce ((acc, transc) => {
            if (!transc.credit && transc.category !== "Credit Card Payments" && transc.category !== "Transfer") {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const credit = transcObjects.reduce ((acc, transc) => {
            if (transc.credit && transc.category !== "Transfer") {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const balance = credit - debit
        return {name, debit, credit, balance, _id, active}
    })
    return calculateLedgers
}

export const calculateCalendarLedger = (allTransc) => {
    const dateTotals = {};
    allTransc.forEach(eachTransaction => {
        const { amount, credit, date } = eachTransaction;

        if (!dateTotals[date]) {
            dateTotals[date] = { expense: 0, revenue: 0 };
        }

        if (!credit && eachTransaction.category !== "Transfer" && eachTransaction.category !== "Credit Card Payments") {
            dateTotals[date].expense += amount;
        } else if (credit && eachTransaction.category !== "Transfer") {
            dateTotals[date].revenue += amount;
        }
    });
    const resultArray = Object.keys(dateTotals).map(date => {
        const array = [dateTotals[date].expense, dateTotals[date].revenue]
        return {
            date,
            title: array
        }
    });

    return resultArray
}
