import type { PaymentInfo } from '../interfaces/orders'

export function validateTheOrderValueWithInThePayment(
  paymentInfo: PaymentInfo[],
  totalOrderGroupValue: number
): boolean {
  const validateTransactions = new Array<boolean>()
  let transactionId = null

  for (const payment of paymentInfo) {
    transactionId === payment.transactionId && validateTransactions.push(true)
    transactionId = payment.transactionId
  }

  if (
    validateTransactions.length > 0 &&
    !validateTransactions.includes(false)
  ) {
    return totalOrderGroupValue - paymentInfo[0].paymentValue !== 0
  }

  const totalPaymentValue = paymentInfo
    .map((payment) => payment.paymentValue)
    .reduce((accumulated, value) => accumulated + value, 0)

  return totalPaymentValue - totalOrderGroupValue === 0
}
