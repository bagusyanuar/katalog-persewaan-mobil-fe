import { Member } from "@/model/member"

export type TState = {
    Members: Array<Member>
    LoadingMember: boolean
}

const initialState: TState = {
    Members: [],
    LoadingMember: false
}

export default initialState