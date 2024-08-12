export type TState = {
    Email: string
    Password: string
    Username: string
    Name: string
    Phone: string
    Address: string
    Latitude: string
    Longitude: string
    LoadingSave: boolean
}

const initialState: TState = {
    Email: '',
    Password: '',
    Username: '',
    Name: '',
    Phone: '',
    Address: '',
    Latitude: '',
    Longitude: '',
    LoadingSave: false
}

export default initialState