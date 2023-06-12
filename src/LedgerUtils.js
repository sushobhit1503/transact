import randomColor from "randomcolor"

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
        const {uid} = ledger
        const transcObjects = allTransc.filter(transc => transc.ledger === uid)
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
        const {uid, name, active} = ledger
        const transcObjects = allTransc.filter (transc => transc.ledger === uid)
        const debit = transcObjects.reduce ((acc, transc) => {
            if (!transc.credit) {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const credit = transcObjects.reduce ((acc, transc) => {
            if (transc.credit) {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const balance = credit - debit
        return {name, debit, credit, balance, uid, active}
    })
    return calculateLedgers
}

export const calculatePaymentMethodsLedger = (transc, paymentData) => {
    const result = paymentData.map(data => {
        const {uid, paymentMethodName} = data
        const debit = transc.reduce ((sum, object) => {
            if (object.paymentMethod === uid && !object.credit ) {
                return sum + object.amount
            }
            return sum
        }, 0)
        const credit = transc.reduce ((sum, object) => {
            if (object.paymentMethod === uid && object.credit ) {
                return sum + object.amount
            }
            return sum
        }, 0)
        return {paymentMethodName, debit, credit}
    })
    return result
}

export const calculateCalendarLedger = (transc) => {
    const result = transc.reduce ((acc, object) => {
        const {amount, credit, date} = object
        if (!acc[date]) {
            acc[date] = {
                debit: 0, credit: 0
            }
        }
        if (credit) {
            acc[date].credit += amount
        }
        else
            acc[date].debit += amount
        return acc
    }, {})

    const dateTotals = Object.keys(result).map(date => ({
        date,
        debit: result[date].debit,
        credit: result[date].credit
    }))
    return dateTotals
}

export const calculateCategoryLedger = (transc) => {
    const result = transc.reduce ((acc, obj) => {
        const {amount, category, credit} = obj
        if (acc[category] && !credit) {
            acc[category] += amount
        }
        else
            acc[category] = amount
        return acc;
    }, {})
    const categoryData = Object.keys(result).map(category => ({
        name: category,
        sum: result[category]
    }))
    return categoryData
}


