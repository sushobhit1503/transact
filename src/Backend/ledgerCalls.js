import axios from "axios"
import { baseUrl } from "../index"

export const getEachLedger = async (ledger_id) => {
    const result = await axios.get(`${baseUrl}/ledger/${ledger_id}`)
    return result.data
}

export const createNewLedger = async (ledgerData) => {
    const result = await axios.post(`${baseUrl}/ledger`, ledgerData)
    return result.data
}

export const getAllLedgers = async () => {
    const result = await axios.get (`${baseUrl}/ledger/all`)
    return result.data
}

export const getLedgersByAccount = async (accountId) => {
    const result = await axios.get (`${baseUrl}/ledger/account/${accountId}`)
    return result.data
}

export const activateLedger = async (ledger_id) => {
    const result = await axios.put (`${baseUrl}/ledger/activate/${ledger_id}`)
    return result.data
}

export const deActivateLedger = async (ledger_id) => {
    const result = await axios.put (`${baseUrl}/ledger/deactivate/${ledger_id}`)
    return result.status
}