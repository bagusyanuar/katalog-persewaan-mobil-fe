export type TState = {
    Email: string
    Password: string
    Username: string
    Name: string
    Phone: string
    Address: string
    LoadingRegister: boolean
}

const initialState: TState = {
    Email: '',
    Password: '',
    Username: '',
    Name: '',
    Phone: '',
    Address: '',
    LoadingRegister: false
}

export default initialState