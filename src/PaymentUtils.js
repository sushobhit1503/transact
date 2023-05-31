export const accountWiseColumn = [
    {
        name: "account",
        label: "Account Name",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "paymentCount",
        label: "Total",
        options: {
            filter: true,
            sort: true,
        },
    },
]

export const getAccountWisePayment = (allPayments) => {
    const accountPaymentCount = {};
    allPayments.forEach(eachPayment => {
        const {account} = eachPayment
        if(!accountPaymentCount[account]) {
            accountPaymentCount[account] = 1
        }
        else
            accountPaymentCount[account] ++
    })
    const result = Object.entries(accountPaymentCount).map(([account, paymentCount]) => ({
        account,
        paymentCount
    }))
    return result;
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