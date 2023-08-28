export const creditTranscWithoutTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalCredit = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.credit && eachTransaction.category !== "Transfer") {
            totalRevenue += eachTransaction.amount
            totalCredit += 1
        }
    })

    return {totalRevenue, totalCredit}
}

export const debitTranscLent = (allTransactions) => {
    var totalRevenue = 0
    var totalLent = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.lent) {
            totalRevenue += eachTransaction.amount
            totalLent += 1   
        }
    })

    return {totalRevenue, totalLent}
}

export const debitTranscWithoutTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalDebit = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category !== "Transfer" && eachTransaction.category !== "Credit Card Payments") {
            totalRevenue += eachTransaction.amount
            totalDebit += 1
        }
    })

    return {totalRevenue, totalDebit}
}