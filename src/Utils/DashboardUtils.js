import { categoryOptions } from "../constants"

export const calculateOverallCategoryShare = (allTransactions) => {
  const categoryTotals = {};
  allTransactions.forEach(transaction => {
    const category = transaction.category;
    const amount = transaction.amount;
    if (categoryTotals[category] && category !== "Transfer" && !transaction.credit) {
      categoryTotals[category] += amount;
    } else if (category !== "Transfer" && !transaction.credit) {
      categoryTotals[category] = amount;
    }
  });

  const result = categoryOptions.map(option => ({
    label: option.name,
    y: categoryTotals[option.value] || 0
  }));

  return result
}

export const calculateOverallPaymentShare = (allTransactions, allPayments) => {
  const paymentTotals = {}
  allTransactions.forEach(transaction => {
    const paymentId = transaction.paymentMethod
    const amount = transaction.amount
    if (paymentTotals[paymentId] && !transaction.credit) {
      paymentTotals[paymentId] += amount
    }
    else if (!transaction.credit)
      paymentTotals[paymentId] = amount
  })

  const result = Object.keys(paymentTotals).map(paymentId => {
    const payment = allPayments.find(item => item._id === paymentId);
    var paymentName = payment ? payment.paymentMethodName : "Unknown Payment";
    const totalAmount = paymentTotals[paymentId];
    if (totalAmount !== 0)
      return { label: paymentName, y: totalAmount };
  })

  return result
}

export const calculateCreditCardInfo = (allPayments, allTransc) => {
  console.log(allPayments);
  console.log(allTransc)
  const creditTransaction = allTransc.filter(transc => allPayments.find(method => method._id === transc.paymentMethod))
  console.log(creditTransaction);
  const result = allPayments.filter(method => creditTransaction.some(transc => transc.paymentMethod === method._id)).map(method => {
    const filteredTransactions = creditTransaction.filter(transc => transc.paymentMethod === method._id)
    const totalAmount = filteredTransactions.reduce((acc, transc) => acc + transc.amount, 0)
    return { paymentMethod: method.paymentMethodName, totalAmount }
  })
  return result
}