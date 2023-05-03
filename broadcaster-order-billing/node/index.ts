import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { verifyOrderSplit } from './events/verifyOrderSplit'
import { changeSkuEvent } from './events/skuChangeEvent'

const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface OrderEventContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }

  type State = RecorderState
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  events: {
    orderEvent: verifyOrderSplit,
    skuChange: changeSkuEvent,
  },
})
