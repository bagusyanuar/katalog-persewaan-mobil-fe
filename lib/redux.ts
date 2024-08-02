
import type { RootState } from '@/redux/store'
import type { APIResponse } from './util'

export type ThunkConfig = {
    state: RootState
    rejectValue: APIResponse
}

export type TPagination = {
    PageLength: Array<number>
    PerPage: number
    Page: number
    Rows: number
    TotalPage: number
}

export const InitialPagination: TPagination = {
    PageLength: [10, 25, 50],
    PerPage: 10,
    Page: 1,
    Rows: 0,
    TotalPage: 0
}

type TMetaPagination = Omit<TPagination, 'PageLength'>

export function mapToMetaPagination(meta: any): TMetaPagination {
    return {
        Page: meta['page'] as number,
        PerPage: meta['per_page'] as number,
        TotalPage: meta['total_page'] as number,
        Rows: meta['total_rows'] as number
    }
}

export type PayloadEntity = { key: string, value: any }


