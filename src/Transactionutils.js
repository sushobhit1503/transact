export const calculateLentTransc = (allTransc, allShops, allPayments) => {
    const allLentTransc = allTransc.filter (transc => transc.lent === true && transc.amount !== 0).map (transaction => {
        const {shopName, amount, itemName, uid, creditPerson, paymentMethod } = transaction
        const shop = allShops.find(shop => shop.uid === shopName)?.name
        const paymentName = allPayments.find(payment => payment.uid === paymentMethod)?.paymentMethodName
        return {shop, amount, itemName, uid, creditPerson, paymentName}
    })

    return allLentTransc
}

export const calculateAllTransc = (allTransc, allShops, allAccounts, allLedgers, allPayment) => {
    const validTransc = allTransc.filter (transc => !transc.lent)
    const transformedData = validTransc.map (transc => {
        const {uid, itemName, amount, credit, category, ledger, shopName, paymentMethod, account, date } = transc
        const shop = allShops.find (shop => shop.uid === shopName)?.name
        const ledgerName = allLedgers.find (eachledger => eachledger.uid === ledger).name
        const accountObject = allAccounts.find (eachAccount => eachAccount.uid === account)
        const accountName = `${accountObject.bankName} - ${accountObject.accountType}`
        const paymentName = allPayment.find (eachPayment => eachPayment.uid === paymentMethod)?.paymentMethodName
        return {uid, itemName, shop, ledgerName, accountName, paymentName, category, credit, amount, date }
    })

    return transformedData
}