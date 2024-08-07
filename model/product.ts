export type Product = {
    ID: number,
    VehicleNumber: string,
    Name: string,
    Price: number,
    Image: string,
    Description: string,
}


export type ProductRequest = {
    ID: number,
    VehicleNumber: string,
    Name: string,
    Price: number,
    Image: File | null,
    Description: string,
}