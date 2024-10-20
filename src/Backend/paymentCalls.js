import axios from "axios"
import { baseUrl } from "../index"

export const createNewPaymentMethod = async (paymentMethodData) => {
    const result = await axios.post(`${baseUrl}/payment`, paymentMethodData)
    return result.status
}

export const getAllPaymentMethods = async () => {
    const result = await axios.get (`${baseUrl}/payment`)
    return result.data
}

export const getEachPaymentMethod = async (paymentUid) => {
    const result = await axios.get (`${baseUrl}/payment/${paymentUid}`)
    return result.data
}

export const getPaymentByCredit = async () => {
    const result = await axios.get (`${baseUrl}/payment/credit/check`)
    return result.data
}

export const deletePaymentMethod = async (paymentUid) => {
    const result = await axios.delete (`${baseUrl}/payment/${paymentUid}`)
    return result.status
}

export const allCardDetails = async () => {
    const result = await axios.get (`${baseUrl}/payment/cards`)
    return result.data
}