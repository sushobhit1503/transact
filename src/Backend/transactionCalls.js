import axios from "axios"
import { baseUrl } from "../index"

export const getAllTransc = async () => {
    const result = await axios.get (`${baseUrl}/transaction/all`)
    return result.data
}

export const getTranscByAccount = async (account_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/account/${account_uid}`)
    return result.data
}

export const getTranscByLedger = async (ledger_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/ledger/${ledger_uid}`)
    return result.data
}

export const getTranscsByPaymentMethod = async (account_uid, paymentMethod) => {
    const result = await axios.get (`${baseUrl}/transaction/method/${account_uid}/${paymentMethod}`)
    return result.data
}
export const getLedgerTranscsByPaymentMethod = async (ledger_uid, paymentMethod) => {
    const result = await axios.get (`${baseUrl}/transaction/method/ledger/${ledger_uid}/${paymentMethod}`)
    return result.data
}

export const getCreditedTranscByAccount = async (account_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/credited/${account_uid}`)
    return result.data
}

export const getCreditedTranscByLedger = async (ledger_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/credited/ledger/${ledger_uid}`)
    return result.data
}

export const getCategoryTranscByAccount = async (category, account_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/category/${category}/${account_uid}`)
    return result.data
}

export const getCategoryTranscByLedger = async (category, ledger_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/category/ledger/${category}/${ledger_uid}`)
    return result.data
}

export const getTranscDateByAccount = async (date, account_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/date/${date}/${account_uid}`)
    return result.data
}

export const getTranscDateByLedger = async (date, ledger_uid) => {
    const result = await axios.get (`${baseUrl}/transaction/date/ledger/${date}/${ledger_uid}`)
    return result.data
}

export const changeTranscAmount = async (amount, transc_uid) => {
    const result = await axios.put (`${baseUrl}/transaction/amount/${transc_uid}/${amount}`)
    return result.data
}

export const createnewTransc = async (transactionData) => {
    const result = await axios.post (`${baseUrl}/transaction`, transactionData)
    return result.status
}

export const deleteTransaction = async (transc_uid) => {
    const result = await axios.delete (`${baseUrl}/transaction/${transc_uid}`)
    return result.status
}