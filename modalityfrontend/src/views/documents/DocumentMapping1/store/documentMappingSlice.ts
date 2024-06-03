// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import {
//     apiGetSalesDocument,
//     apiPutSalesDocument,
//     apiDeleteSalesDocuments,
// } from '@/services/SalesService'

// type DocumentData = {
//     id?: number
//     documentname?: string
//     status?: string
//     type?: string
//     uploadedAt?: string
//     companyid?: number
// }

// export type SalesDocumentEditState = {
//     loading: boolean
//     documentData: DocumentData
// }

// type GetSalesDocumentResponse = DocumentData

// export const SLICE_NAME = 'salesDocumentEdit'

// export const getDocument = createAsyncThunk(
//     SLICE_NAME + '/getDocuments',
//     async (data: { id: number }) => {
//         const response = await apiGetSalesDocument<
//             GetSalesDocumentResponse,
//             { id: number }
//         >(data)
//         return response.data
//     },
// )

// export const updateDocument = async <T, U extends Record<string, unknown>>(
//     data: U,
// ) => {
//     const response = await apiPutSalesDocument<T, U>(data)
//     return response.data
// }

// export const deleteDocument = async <T, U extends { id: number }>(data: U) => {
//     const response = await apiDeleteSalesDocuments<T, U>(data)
//     return response.data
// }

// const initialState: SalesDocumentEditState = {
//     loading: true,
//     documentData: {},
// }

// const documentEditSlice = createSlice({
//     name: `${SLICE_NAME}/state`,
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getDocument.fulfilled, (state, action) => {
//                 state.documentData = action.payload
//                 state.loading = false
//             })
//             .addCase(getDocument.pending, (state) => {
//                 state.loading = true
//             })
//     },
// })

// export default documentEditSlice.reducer
