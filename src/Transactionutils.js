export const calculateOverallCreditTransactions = (allTransactions) => {
    var totalCreditTransc = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.credit)
            totalCreditTransc += 1
    })
    return totalCreditTransc
}

export const calculateOverallDebitTransactions = (allTransactions) => {
    var totalDebitTransc = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit)
            totalDebitTransc += 1
    })
    return totalDebitTransc
}

export const calculateOverallLentTransactions = (allTransactions) => {
    var totalLentTransc = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.lent)
            totalLentTransc += 1
    })
    return totalLentTransc
}
