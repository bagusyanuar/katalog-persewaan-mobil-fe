export type Driver = {
    ID: number
    MerchantID: number
    Name: string
    Image: string
    Phone: string
    Price: number
}

export type MerchantDriver = {
    ID: number
    Name: string
    Image: string
    Phone: string
    Price: number
}

export type MerchantDriverRequest = {
    ID: number,
    Phone: string,
    Name: string,
    Price: number,
    Image: File | null,
}