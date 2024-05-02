import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesCompanies,
    apiDeleteSalesCompanies,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'

type Company = {
    id: string
    name: string
    companyCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Companies = Company[]

type GetSalesCompaniesResponse = {
    data: Companies
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    companyStatus: number
}

export type SalesCompanyListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedCompany: string
    tableData: TableQueries
    filterData: FilterQueries
    companyList: Company[]
}

type GetSalesCompaniesRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'salesCompanyList'

export const getCompanies = createAsyncThunk(
    SLICE_NAME + '/getCompanies',
    async (data: GetSalesCompaniesRequest) => {
        const response = await apiGetSalesCompanies<
            GetSalesCompaniesResponse,
            GetSalesCompaniesRequest
        >(data)
        return response.data
    },
)

export const deleteCompany = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesCompanies<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesCompanyListState = {
    loading: false,
    deleteConfirmation: false,
    selectedCompany: '',
    companyList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        companyStatus: 0,
    },
}

const companyListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateCompanyList: (state, action) => {
            state.companyList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedCompany: (state, action) => {
            state.selectedCompany = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.companyList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCompanies.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateCompanyList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedCompany,
} = companyListSlice.actions

export default companyListSlice.reducer
