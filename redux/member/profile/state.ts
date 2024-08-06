
export type TState = {
    Email: string
    Username: string
    Password: string
    Name: string
    Phone: string
    Address: string
    LoadingSaveProfile: boolean
    LoadingGetProfile: boolean
}

const initialState: TState = {
    Email: '',
    Username: '',
    Password: '',
    Name: '',
    Phone: '',
    Address: '',
    LoadingSaveProfile: false,
    LoadingGetProfile: true,
}

export default initialState