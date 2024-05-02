import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesCompany,
    apiPutSalesCompany,
    apiDeleteSalesCompanies,
} from '@/services/SalesService'

type CompanyData = {
    id?: string
    name?: string
    companyCode?: string
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    category?: string
    price?: number
    stock?: number
    status?: number
    costPerItem?: number
    bulkDiscountPrice?: number
    description?: string
    taxRate?: 6
    tags?: string[]
    brand?: string
    vendor?: string
}

export type SalesCompanyEditState = {
    loading: boolean
    companyData: CompanyData
}

type GetSalesCompanyResponse = CompanyData

export const SLICE_NAME = 'salesCompanyEdit'

export const getCompany = createAsyncThunk(
    SLICE_NAME + '/getCompanies',
    async (data: { id: string }) => {
        const response = await apiGetSalesCompany<
            GetSalesCompanyResponse,
            { id: string }
        >(data)
        return response.data
    },
)

export const updateCompany = async <T, U extends Record<string, unknown>>(
    data: U,
) => {
    const response = await apiPutSalesCompany<T, U>(data)
    return response.data
}

export const deleteCompany = async <T, U extends Record<string, unknown>>(
    data: U,
) => {
    const response = await apiDeleteSalesCompanies<T, U>(data)
    return response.data
}

const initialState: SalesCompanyEditState = {
    loading: true,
    companyData: {},
}

const companyEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompany.fulfilled, (state, action) => {
                state.companyData = action.payload
                state.loading = false
            })
            .addCase(getCompany.pending, (state) => {
                state.loading = true
            })
    },
})

export default companyEditSlice.reducer
