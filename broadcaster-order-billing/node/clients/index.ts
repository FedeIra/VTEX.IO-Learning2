import { IOClients } from '@vtex/api'

import { OMS } from './oms'

export class Clients extends IOClients {
  public get orders() {
    return this.getOrSet('oms', OMS)
  }
}
