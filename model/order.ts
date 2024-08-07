export type Order = {
    ID: number
    ReferenceNumber: string
    Total: number
    DateRent: string
    DateReturn: string
    Status: number
    Customer: OrderCustomer
}

export type OrderCustomer = {
    CustomerName: string
    CustomerPhone: string
}