import axios from "axios"
import { baseUrl } from "../index"

export const createNewShop = async (shopData) => {
    const result = await axios.post(`${baseUrl}/shops`, shopData)
    return result.status
}

export const getAllShops = async () => {
    const result = await axios.get (`${baseUrl}/shops`)
    return result.data
}

export const getEachShop = async (shopUid) => {
    const result = await axios.get (`${baseUrl}/shop/${shopUid}`)
    return result.data
}

export const editShopName = async (shopUid, name) => {
    const result = await axios.get (`${baseUrl}/shop/${shopUid}/${name}`)
    return result.data
}

export const editShopCity = async (shopUid, city) => {
    const result = await axios.get (`${baseUrl}/shop/${shopUid}/${city}`)
    return result.data
}

export const deleteShop = async (shop_id) => {
    const result = await axios.delete (`${baseUrl}/shop/${shop_id}`)
    return result.status
}