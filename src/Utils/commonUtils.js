export const creditTransc = (allTransactions) => {
    var totalRevenue = 0
    var totalCredit = 0
    allTransactions.map(eachTransaction => {
        if (eachTransaction.credit) {
            totalRevenue += eachTransaction.amount
            totalCredit += 1
        }
    })

    return { totalRevenue, totalCredit }
}

export const creditTranscTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalCredit = 0
    allTransactions.map(eachTransaction => {
        if (eachTransaction.credit && eachTransaction.category === "Transfer") {
            totalRevenue += eachTransaction.amount
            totalCredit += 1
        }
    })

    return { totalRevenue, totalCredit }
}

export const debitTranscLent = (allTransactions) => {
    var totalRevenue = 0
    var totalLent = 0
    allTransactions?.map(eachTransaction => {
        if (eachTransaction.lent) {
            totalRevenue += eachTransaction.amount
            totalLent += 1
        }
    })

    return { totalRevenue, totalLent }
}

export const debitTransc = (allTransactions) => {
    var totalRevenue = 0
    var totalDebit = 0
    allTransactions.map(eachTransaction => {
        if (!eachTransaction.credit) {
            totalRevenue += eachTransaction.amount
            totalDebit += 1
        }
    })

    return { totalRevenue, totalDebit }
}

export const debitTranscCardPayments = (allTransactions) => {
    var totalExpense = 0
    var totalDebit = 0
    allTransactions.map(eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category === "Credit Card Payments") {
            totalExpense += eachTransaction.amount
            totalDebit += 1
        }
    })

    return { totalExpense, totalDebit }
}

export const debitTranscTransfer = (allTransactions) => {
    var totalRevenue = 0
    var totalDebit = 0
    allTransactions.map(eachTransaction => {
        if (!eachTransaction.credit && eachTransaction.category === "Transfer") {
            totalRevenue += eachTransaction.amount
            totalDebit += 1
        }
    })

    return { totalRevenue, totalDebit }
}
