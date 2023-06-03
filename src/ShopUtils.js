export const cityWiseColumn = [
    {
        name: "city",
        label: "City",
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

export const getCityWiseShop = (allShops) => {
    const shopCount = {};
    allShops.forEach(eachShop => {
        const {city} = eachShop
        if(!shopCount[city]) {
            shopCount[city] = 1
        }
        else
            shopCount[city] ++
    })
    const result = Object.entries(shopCount).map(([city, totalCount]) => ({
        city,
        totalCount
    }))
    return result;
}

export const calculateShopOverview = (shopId, allTransactions) => {
    let count = 0
    let sum = 0
    allTransactions.forEach (eachTransc => {
        if (eachTransc.shopName === shopId) {
            count ++
            sum += eachTransc.amount
        }
    })

    return {count, sum}
}