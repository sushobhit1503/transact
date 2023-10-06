export const calculateLentTransc = (allTransc, allShops, allPayments) => {
    const allLentTransc = allTransc.filter (transc => transc.lent === true && transc.amount !== 0).map (transaction => {
        const {shopName, amount, itemName, _id, creditPerson, paymentMethod } = transaction
        const shop = allShops.find(shop => shop._id === shopName)?.name
        const paymentName = allPayments.find(payment => payment._id === paymentMethod)?.paymentMethodName
        return {shop, amount, itemName, _id, creditPerson, paymentName}
    })

    return allLentTransc
}

export const calculateAllTransc = (allTransc, allShops, allAccounts, allLedgers, allPayment) => {
    const validTransc = allTransc.filter (transc => !transc.lent)
    const transformedData = validTransc.map (transc => {
        const {_id, itemName, amount, credit, category, ledger, shopName, paymentMethod, account, date } = transc
        const shop = allShops.find (shop => shop._id === shopName)?.name
        const ledgerName = allLedgers.find (eachledger => eachledger._id === ledger)?.name
        const accountObject = allAccounts.find (eachAccount => eachAccount._id === account)
        const accountName = `${accountObject?.bankName} - ${accountObject?.accountType}`
        const paymentName = allPayment.find (eachPayment => eachPayment._id === paymentMethod)?.paymentMethodName
        return {_id, itemName, shop, ledgerName, accountName, paymentName, category, credit, amount, date }
    })

    return transformedData
}