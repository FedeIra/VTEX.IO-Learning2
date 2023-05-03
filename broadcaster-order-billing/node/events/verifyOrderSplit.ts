import type { Order } from '../interfaces/orders'
//import { getOrderGroup } from '../middlewares/getOrderGroup'


export async function verifyOrderSplit(ctx: OrderEventContext): Promise<void> {
  const {
    clients: { orders: ordersClient },
    body: { orderId },
    vtex: { logger },
  } = ctx



  const order: Order = await ordersClient
    .getOrder(orderId)
    .then((res) => res)
    .catch((error) => {
      logger.error(`Orders error: ${error.response.statusText}`)
      return null
    })

    console.log(order);
    console.log(orderId);
    console.log(logger);
    console.log(ctx);

  //order && (await getOrderGroup(ctx, order.orderGroup))

}
