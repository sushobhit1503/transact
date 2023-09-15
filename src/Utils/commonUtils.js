import { getAllAccounts } from '../Backend/accountCalls';
import { getAllPaymentMethods } from '../Backend/paymentCalls';
import { getAllLedgers } from '../Backend/ledgerCalls';
import { getAllShops } from '../Backend/shopCalls';
import { getAllTransc } from '../Backend/transactionCalls';

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
    allTransactions.map(eachTransaction => {
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

export const updateLocalStorage = () => {
    localStorage.removeItem("account")
    localStorage.removeItem("payments")
    localStorage.removeItem("ledgers")
    localStorage.removeItem("shops")
    localStorage.removeItem("transc")
    getAllAccounts().then(allAccounts => {
        localStorage.setItem("accounts", JSON.stringify(allAccounts))
    })
    getAllPaymentMethods().then(allPayment => {
        localStorage.setItem("payments", JSON.stringify(allPayment))
    })
    getAllLedgers().then(allLedgers => {
        localStorage.setItem("ledgers", JSON.stringify(allLedgers))
    })
    getAllShops().then(allShops => {
        localStorage.setItem("shops", JSON.stringify(allShops))
    })
    getAllTransc().then(allTransc => {
        localStorage.setItem("transc", JSON.stringify(allTransc))
    })
}