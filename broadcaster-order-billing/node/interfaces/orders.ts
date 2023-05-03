interface Payment {
  id: string
  value: number
}

interface Transactions {
  transactionId: string
  payments: Payment[]
}

interface PaymentData {
  transactions: Transactions[]
}

interface Packages {
  invoiceNumber: string
  invoiceValue: number
  issuanceDate: string
  type: string
}

interface PackageAttachment {
  packages: Packages[]
}

interface Order {
  orderGroup: string
  orderId: string
  paymentData: PaymentData
  status: string
  value: number
  packageAttachment?: PackageAttachment
}

interface OrderGroup {
  orderId: string
  totalValue: number
}

interface PaymentInfo {
  orderId: string
  paymentValue: number
  transactionId: string | null
}

export { Order, OrderGroup, PaymentInfo }
