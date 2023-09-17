import axios from "axios"
import { baseUrl } from "../index"

export const getEachAccount = async (account_id) => {
    const result = await axios.get(`${baseUrl}/account/${account_id}`)
    return result.data
}

export const createNewAccount = async (accountData) => {
    const result = await axios.post(`${baseUrl}/account`, accountData)
    return result.status
}

export const getAllAccounts = async () => {
    const result = await axios.get (`${baseUrl}/account/accounts/all`)
    return result.data
}

export const deleteAccount = async (account_id) => {
    const result = axios.delete (`${baseUrl}/account/${account_id}`)
    return result.status
}