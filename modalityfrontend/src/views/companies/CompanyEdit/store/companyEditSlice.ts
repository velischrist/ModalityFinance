import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesCompany,
    apiPutSalesCompany,
    apiDeleteSalesCompanies,
} from '@/services/SalesService'

type CompanyData = {
    companyid?: number
    companyname?: string
    industry?: string
    location?: string
}

export type SalesCompanyEditState = {
    loading: boolean
    companyData: CompanyData
}

type GetSalesCompanyResponse = CompanyData

export const SLICE_NAME = 'salesCompanyEdit'

export const getCompany = createAsyncThunk(
    SLICE_NAME + '/getCompanies',
    async (data: { companyid: number }) => {
        const response = await apiGetSalesCompany<
            GetSalesCompanyResponse,
            { companyid: number }
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

export const deleteCompany = async <T, U extends { companyid: number }>(
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
