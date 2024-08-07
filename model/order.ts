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

export type OrderDetail = {
    ID: number
    ReferenceNumber: string
    Total: number
    DateRent: string
    DateReturn: string
    Status: number
    Customer: OrderCustomer
    Carts: Array<OrderCart>
    Driver: Array<OrderRentDriver>
}

export type OrderCart = {
    Product: OrderCartProduct
    Price: number
}

export type OrderCartProduct = {
    Name: string
    Image: string
}

export type OrderRentDriver = {
    Driver: OrderDriver
    Price: number
}

export type OrderDriver = {
    Name: string
    Image: string
}