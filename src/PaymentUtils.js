import { getEachAccount } from "./Backend/accountCalls";

export const accountWiseColumn = [
    {
        name: "name",
        label: "Account Name",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "totalCount",
        label: "Total",
        options: {
            filter: true,
            sort: true,
        },
    },
]

export const getAccountWisePayment = (allPayments, allAccounts) => {
    const result = allAccounts.map(account => {
        const {uid, bankName, accountType} = account
        const totalCount = allPayments.filter(payment => payment.account === uid).length
        const name = `${bankName} - ${accountType}`
        return {
            name, totalCount
        }
    })
    return result
}

export const calculatePaymentOverview = (paymentId, allTransactions) => {
    let count = 0
    let sum = 0
    allTransactions.forEach (eachTransc => {
        if (eachTransc.paymentMethod === paymentId) {
            count ++
            sum += eachTransc.amount
        }
    })

    return {count, sum}
}