import type { OrderGroup } from '../interfaces/orders'
import { invoiceOrder } from './invoiceOrder'
import { validateIfTheOrderIsInSplit } from './validateIfTheOrderIsInSplit'

export async function getOrderGroup(
  ctx: OrderEventContext,
  orderGroupId: string
): Promise<void> {
  let canInvoice = false
  const {
    clients: { orders: ordersClient },
    vtex: { logger },
  } = ctx

  const orderGroup: OrderGroup[] = await ordersClient
    .getOrderGroup(orderGroupId)
    .then((res) => res.list)
    .catch((error) => {
      logger.error(`Orders error: ${error.response.statusText}`)

      return null
    })

  if (orderGroup.length > 0) {
    canInvoice = await validateIfTheOrderIsInSplit(ctx, orderGroup)
  }

  if (canInvoice) {
    /* eslint-disable no-await-in-loop */
    for (const order of orderGroup) {
      await invoiceOrder(ctx, order.orderId)
    }
  }
}
