import { MapAreaModel } from "@/model/map.area.model"

export type TState = {
    DataMap: Array<MapAreaModel>
    LoadingMap: boolean
}

const initialState: TState = {
    DataMap: [],
    LoadingMap: false
}

export default initialState