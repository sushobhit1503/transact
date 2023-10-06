export const calculateCurrentAccounts = (allAccounts) => {
    var totalCurrent = 0
    allAccounts.map(eachAccount => {
        if (eachAccount.accountType === "Current")
            totalCurrent += 1
    })
    return totalCurrent
}

export const calculateSavingAccounts = (allAccounts) => {
    var totalSavings = 0
    allAccounts.map(eachAccount => {
        if (eachAccount.accountType === "Savings")
            totalSavings += 1
    })
    return totalSavings

}

export const calculateMiscAccounts = (allAccounts) => {
    var totalMisc = 0
    allAccounts.map(eachAccount => {
        if (eachAccount.accountType === "Miscellaneous")
            totalMisc += 1
    })
    return totalMisc

}

export const calculateTotalBanks = (allAccounts) => {
    return allAccounts.reduce((count, eachAccount) => {
        count.add(eachAccount["bankName"])
        return count
    }, new Set()).size
}

export const calculateAccountOverview = (allAccounts, allTransc) => {
    var calculateAccount = allAccounts.map(account => {
        const { _id, bankName, accountType } = account
        const transcObjects = allTransc.filter(transc => transc.account === _id)
        const debit = transcObjects.reduce((acc, transc) => {
            if (!transc.credit && transc.category !== "Credit Card Payments" && transc.category !== "Transfer") {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const credit = transcObjects.reduce((acc, transc) => {
            if (transc.credit && transc.category !== "Transfer") {
                return acc + transc.amount
            }
            return acc
        }, 0)
        const balance = credit - debit
        return { bankName, accountType, debit, credit, balance, _id }
    })
    return calculateAccount
}

export const calculateAccountLedgers = (allTransc, allLedgers, accountId) => {
    const transformedLedgers = allLedgers.filter(ledger => ledger.account === accountId)
    const transformedData = transformedLedgers.map(ledger => {
        const { _id, name } = ledger
        const transactions = allTransc.filter(transc => transc.ledger === _id)
        const debit = transactions.reduce((total, transc) => {
            return (!transc.credit && transc.category !== "Credit Card Payments" && transc.category !== "Transfer") ? total + transc.amount : total
        }, 0)
        const credit = transactions.reduce((total, transc) => {
            return (transc.credit && transc.category !== "Transfer") ? total + transc.amount : total
        }, 0)
        const balance = credit - debit
        return { _id, name, debit, credit, balance }
    })

    return transformedData
}

export const calculateLedgerAccountOverview = (allLedgers) => {
    const total = allLedgers.length
    const totalActive = allLedgers.filter(ledger => ledger.active).length
    const totalDeactive = allLedgers.filter(ledger => !ledger.active).length

    return { total, totalActive, totalDeactive }
}

export const calculateCalendarData = (allTransc) => {
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