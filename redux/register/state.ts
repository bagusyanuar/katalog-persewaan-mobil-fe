export type TState = {
    Email: string
    Password: string
    Username: string
    Name: string
    Phone: string
    Address: string
    Latitude: number
    Longitude: number
    LoadingRegister: boolean
}

const initialState: TState = {
    Email: '',
    Password: '',
    Username: '',
    Name: '',
    Phone: '',
    Address: '',
    Latitude: 0,
    Longitude: 0,
    LoadingRegister: false
}

export default initialState