import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api/lib/clients'

export class OMS extends ExternalClient {
  private baseUrl = '/api/oms/pvt/orders'
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        VtexIdclientAutCookie: context.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async getOrder(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  public async getOrderGroup(id: string) {
    return this.http.get(`${this.baseUrl}?OrderGroup=${id}`)
  }

  public async invoice(id: string, body: any) {
    return this.http.post(`${this.baseUrl}/${id}/invoice`, body)
  }
}
