export const creditTransc = (allTransactions) => {
    var totalRevenue = 0
    var totalCredit = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.credit) {
            totalRevenue += eachTransaction.amount
            totalCredit += 1
        }
    })

    return {totalRevenue, totalCredit}
}

export const debitTranscWithoutTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalDebit = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category !== "Transfer") {
            totalRevenue += eachTransaction.amount
            totalDebit += 1
        }
    })

    return {totalRevenue, totalDebit}
}

export const creditTranscTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalCredit = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.credit && eachTransaction.category === "Transfer") {
            totalRevenue += eachTransaction.amount
            totalCredit += 1
        }
    })

    return {totalRevenue, totalCredit}
}

export const debitTranscTransfer = (allTransactions) => {
    var totalExpense = 0
    var totalDebit = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category === "Transfer") {
            totalExpense += eachTransaction.amount
            totalDebit += 1
        }
    })

    return {totalExpense, totalDebit}
}

export const debitTranscCardPayments = (allTransactions) => {
    var totalExpense = 0
    var totalDebit = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category === "Credit Card Payments") {
            totalExpense += eachTransaction.amount
            totalDebit += 1
        }
    })

    return {totalExpense, totalDebit}
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