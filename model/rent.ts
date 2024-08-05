export type RentModel = {
    ID: number
    ReferenceNumber: string
    Total: number
    DateRent: string
    DateReturn: string
    Status: number
}

export type RentDetailModel = {
    ID: number
    ReferenceNumber: string
    Total: number
    DateRent: string
    DateReturn: string
    Status: number
    Carts: Array<RentCart>
    Drivers: Array<RentDriver>
}

export type RentCart = {
    ID: number
    Product: RentCartProduct
    Price: number
}

export type RentCartProduct = {
    ID: number
    Name: string
    Image: string
}

export type RentDriver = {
    ID: number
    Profile: DriverProfile
    Price: number
}

type DriverProfile = {
    ID: string
    Name: string
    Image: string
}