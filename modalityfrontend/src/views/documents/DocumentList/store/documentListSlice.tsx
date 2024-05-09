import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesDocuments,
    apiDeleteSalesDocuments,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'

type Document = {
    id: string
    documentName: string
    uploadedAt: string
    status: string
    type: string
}

type Documents = Document[]

type GetSalesDocumentsResponse = {
    data: Documents
    total: number
}

type FilterQueries = {
    documentName: string
    status: string
    type: string
    uploadedAt: string
}

export type SalesDocumentListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedDocument: string
    tableData: TableQueries
    filterData: FilterQueries
    documentList: Document[]
}

type GetSalesDocumentsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'salesDocumentList'

export const getDocuments = createAsyncThunk(
    SLICE_NAME + '/getDocuments',
    async (data: GetSalesDocumentsRequest) => {
        const response = await apiGetSalesDocuments<
            GetSalesDocumentsResponse,
            GetSalesDocumentsRequest
        >(data)
        return response.data
    },
)

export const deleteDocument = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesDocuments<
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

const initialState: SalesDocumentListState = {
    loading: false,
    deleteConfirmation: false,
    selectedDocument: '',
    documentList: [],
    tableData: initialTableData,
    filterData: {
        documentName: '',
        status: '',
        type: '',
        uploadedAt: '',
    },
}

const documentListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateDocumentList: (state, action) => {
            state.documentList = action.payload
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
        setSelectedDocument: (state, action) => {
            state.selectedDocument = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDocuments.fulfilled, (state, action) => {
                state.documentList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getDocuments.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateDocumentList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedDocument,
} = documentListSlice.actions

export default documentListSlice.reducer
