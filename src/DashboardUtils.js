import { categoryOptions } from "./constants"
import randomColor from "randomcolor"

export const calculateOverallExpense = (allTransactions) => {
    var totalExpense = 0
    allTransactions.map (eachTransaction => {
        if (!eachTransaction.credit)
            totalExpense += eachTransaction.amount
    })
    return totalExpense
}

export const calculateOverallRevenue = (allTransactions) => {
    var totalRevenue = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.credit)
            totalRevenue += eachTransaction.amount
    })
    return totalRevenue
}

export const calculateOverallLent = (allTransactions) => {
    var totalLent = 0
    allTransactions.map (eachTransaction => {
        if (eachTransaction.lent)
            totalLent += eachTransaction.amount
    })
    return totalLent
}

export const calculateOverallCategoryShare = (allTransactions, payments) => {

}

export const calculateOverallPaymentShare = (allTransactions) => {

}

export const calculateCreditCardInfo = (allPayments, allTransc) => {
    const creditTransaction = allTransc.filter (transc => allPayments.find(method => method.uid === transc.paymentMethod))
    const result = allPayments.filter(method => creditTransaction.some(transc => transc.paymentMethod === method.uid))
    .map (method => {
        const filterteredTransactions = creditTransaction.filter (transc => transc.paymentMethod === method.uid)
        const totalAmount = filterteredTransactions.reduce ((acc, transc) => acc + transc.amount, 0)
        return {paymentMethod: method.paymentMethodName, totalAmount}
    })

    return result
}