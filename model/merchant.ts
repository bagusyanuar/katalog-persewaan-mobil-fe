export type AdminMerchant = {
    ID: number,
    Email: string,
    Username: string,
    Name: string,
    Phone: string,
    Address: string,
    Latitude: number,
    Longitude: number
}

export type Merchant = {
    ID: number,
    UserID: number,
    Name: string,
    Phone: string,
    Address: string,
    Latitude: number,
    Longitude: number
}

export type MerchantProduct = {
    ID: number,
    MerchantID: number,
    VehicleNumber: string,
    Name: string,
    Price: number,
    Image: string,
    Description: string
}

export type MerchantProductWithMerchant = {
    ID: number,
    MerchantID: number,
    VehicleNumber: string,
    Name: string,
    Price: number,
    Image: string,
    Description: string
    Merchant: {
        Nama: string
    }
}