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