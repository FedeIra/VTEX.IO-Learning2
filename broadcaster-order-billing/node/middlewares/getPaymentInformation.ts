import type { Order, OrderGroup, PaymentInfo } from '../interfaces/orders'

export async function getPaymentInformation(
  ctx: OrderEventContext,
  order: OrderGroup
): Promise<PaymentInfo> {
  const {
    clients: { orders: ordersClien },
    vtex: { logger },
  } = ctx

  const { orderId } = order

  const orderData: Order = await ordersClien
    .getOrder(orderId)
    .then((res) => res)
    .catch((error) => {
      logger.error(`Orders error: ${error.response.statusText}`)

      return null
    })

  if (!orderData) throw 'ORDER_NOT_FOUND'

  const {
    paymentData: { transactions },
  } = orderData

  const { transactionId } = transactions[0]

  const paymentValue = transactions.map(
    (transaction) =>
      transaction.payments
        .map((payment) => payment.value)
        .reduce((accumulated, value) => accumulated + value, 0) / 100
  )[0]

  return { orderId, paymentValue, transactionId }
}
