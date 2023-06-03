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

export const calculateTotalBanks = (allAccounts) => {
    return allAccounts.reduce ((count, eachAccount) => {
        count.add(eachAccount["bankName"])
        return count
    }, new Set()).size
}

export const calculateAccountOverview = (allAccounts, allTransc) => {
    var calculateAccount = allAccounts.map(account => {
        const {uid, bankName, accountType} = account
        const transcObjects = allTransc.filter (transc => transc.account === uid)
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
        return {bankName, accountType, debit, credit, balance, uid}
    })
    return calculateAccount
}

export const calculateAccountLedgers = (allTransc, allLedgers, accountId) => {
    const transformedLedgers = allLedgers.filter (ledger => ledger.account === accountId)
    const transformedData = transformedLedgers.map (ledger => {
        const {uid, name} = ledger
        const transactions = allTransc.filter (transc => transc.ledger === uid)
        const debit = transactions.reduce ((total, transc) => {
            return transc.credit ? total : total + transc.amount
        }, 0)
        const credit = transactions.reduce ((total, transc) => {
            return transc.credit ? total + transc.amount : total
        }, 0)
        const balance = debit - credit
        return {uid, name, debit, credit, balance}
    })

    return transformedData
}

export const calculateLedgerAccountOverview = (allLedgers) => {
    const total = allLedgers.length
    const totalActive = allLedgers.filter(ledger => ledger.active).length
    const totalDeactive = allLedgers.filter(ledger => !ledger.active).length

    return {total, totalActive, totalDeactive}
}