import type { OrderGroup, PaymentInfo } from '../interfaces/orders'
import { getPaymentInformation } from './getPaymentInformation'
import { validateTheOrderValueWithInThePayment } from './validateTheOrderValueWithInThePayment'

export async function validateIfTheOrderIsInSplit(
  ctx: OrderEventContext,
  ordersGroup: OrderGroup[]
): Promise<boolean> {
  const paymentInfo = new Array<PaymentInfo>()
  let totalOrderGroupValue = 0

  if (ordersGroup.length >= 0) {
    totalOrderGroupValue =
      ordersGroup
        .map((order) => order.totalValue)
        .reduce((accumulated, value) => accumulated + value, 0) / 100
  }

  /* eslint-disable no-await-in-loop */
  for (const order of ordersGroup) {
    paymentInfo.push(await getPaymentInformation(ctx, order))
  }

  const noPayment = paymentInfo.filter(
    (payment) => payment.transactionId === 'NO-PAYMENT'
  )

  if (noPayment.length > 0) {
    return validateTheOrderValueWithInThePayment(
      paymentInfo,
      totalOrderGroupValue
    )
  }

  return false
}
