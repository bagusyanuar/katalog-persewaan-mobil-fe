export type TState = {
    Email: string
    Password: string
    LoadingLogin: boolean
}

const initialState: TState = {
    Email: '',
    Password: '',
    LoadingLogin: false
}

export default initialState