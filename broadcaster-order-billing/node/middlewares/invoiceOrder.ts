import type { Order } from '../interfaces/orders'

export async function invoiceOrder(ctx: OrderEventContext, orderId: string) {
  const {
    clients: { orders: ordersClient },
    vtex: { logger },
  } = ctx

  const order: Order = await ordersClient
    .getOrder(orderId)
    .then((res) => res)
    .catch((error) => {
      logger.error(`Orders error: ${error.response.statusText}`)

      return null
    })

  const packages = order?.packageAttachment?.packages[0]

  const body = {
    invoiceNumber: packages?.invoiceNumber,
    invoiceValue: packages?.invoiceValue,
    issuanceDate: packages?.issuanceDate,
    type: packages?.type,
  }

  const invoiceData = await ordersClient
    .invoice(orderId, body)
    .then((res) => res)
    .catch((error) => {
      logger.error(`Invoice error: ${error.response.statusText}`)

      return null
    })

  return invoiceData
}
