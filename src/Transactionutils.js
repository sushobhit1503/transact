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
        if (!eachTransaction.credit && eachTransaction.category !== "Credit Card Payments")
            totalDebitTransc += 1
    })
    return totalDebitTransc
}

export const calculateOverallLentTransactions = (allTransactions) => {
    var totalLentTransc = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.lent && eachTransaction.amount !== 0)
            totalLentTransc += 1
    })
    return totalLentTransc
}

export const calculateLentTransc = (allTransc, allShops) => {
    const allLentTransc = allTransc.filter (transc => transc.lent === true && transc.amount !== 0).map (transaction => {
        const {shopName, amount, itemName, uid, creditPerson } = transaction
        const shop = allShops.find(shop => shop.uid === shopName).name
        return {shop, amount, itemName, uid, creditPerson}
    })

    return allLentTransc
}

export const calculateAllTransc = (allTransc, allShops, allAccounts, allLedgers, allPayment) => {
    const validTransc = allTransc.filter (transc => !transc.lent)
    const transformedData = validTransc.map (transc => {
        const {uid, itemName, amount, credit, category, ledger, shopName, paymentMethod, account, date } = transc
        const shop = allShops.find (shop => shop.uid === shopName).name
        const ledgerName = allLedgers.find (eachledger => eachledger.uid === ledger).name
        const accountObject = allAccounts.find (eachAccount => eachAccount.uid === account)
        const accountName = `${accountObject.bankName} - ${accountObject.accountType}`
        const paymentName = allPayment.find (eachPayment => eachPayment.uid === paymentMethod).paymentMethodName

        return {uid, itemName, shop, ledgerName, accountName, paymentName, category, credit, amount, date }
    })

    return transformedData
}