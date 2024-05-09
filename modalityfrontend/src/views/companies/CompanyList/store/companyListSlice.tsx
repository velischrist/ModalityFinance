import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit'
import {
    apiGetSalesCompanies,
    apiDeleteSalesCompanies,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import paginate from '@/utils/paginate'

type Company = {
    companyid: number
    companyname: string
    // status: string
    industry: string
    location: string
    // datecreated: string
}

type Companies = Company[]

type GetSalesCompaniesResponse = {
    data: Companies
    total: number
}

type FilterQueries = {
    companyname: string
    industry: string
    location: string
}

export type SalesCompanyListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedCompany: number
    tableData: TableQueries
    filterData: FilterQueries
    companyList: GetSalesCompaniesResponse
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
        console.log('API Data:', response);
        return response.data;
    },
)

export const deleteCompany = async (data: { companyid: number }) => {
    const response = await apiDeleteSalesCompanies<
        boolean,
        { companyid: number }
    >(data)
    return response;
}

export const initialTableData: TableQueries = {
    total: 10,
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
    selectedCompany: -1,
    companyList: {data: [], total: 0},
    tableData: initialTableData,
    filterData: {
        companyname: '',
        industry: '',
        location: '',
    },
}

const companyListSlice: Slice<SalesCompanyListState> = createSlice({
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
                state.companyList = action.payload
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