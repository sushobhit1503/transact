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