import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { apiGetReportLevel } from '@/services/ReportLevelService'

const dummyReportLevelData = [
    {
        id: 1,
        name: 'Report 1',
        desc: 'Description for report 1',
    },
    {
        id: 2,
        name: 'Report 2',
        desc: 'Description for report 2',
    },
    {
        id: 3,
        name: 'Report 3',
        desc: 'Description for report 3',
    },
]

// type Member = {
//     id: string
//     n@/services/ReportLevelService
//     email: string
//     img: string
// }

type Report = {
    id: number
    name: string
    desc: string
    // attachmentCount: number
    // totalTask: number
    // completedTask: number
    // progression: number
    // dayleft: number
    // status: string
    // member: Omit<Member, 'id' | 'email'>[]
}

type ReportLevel = Report[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetReportLevelRequest = Query

type GetReportLevelResponse = ReportLevel

// type GetScrumBoardtMembersResponse = {
//     allMembers: Member[]
// }

// type PutProjectListRequest = {
//     id: string
//     name: string
//     desc: string
//     totalTask?: number
//     completedTask?: number
//     progression: number
//     member?: Omit<Member, 'email' | 'id'>[]
// }

// type PutProjectListResponse = ProjectList

export type ReportLevelState = {
    loading: boolean
    reportLevel: ReportLevel
    // allMembers: {
    //     value: string
    //     label: string
    //     img: string
    // }[]
    view: 'grid' | 'list'
    query: Query
    // newProjectDialog: boolean
}

export const SLICE_NAME = 'reportLevel'

export const getList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Return dummy data
        return dummyReportLevelData
    },

    //ENABLE THIS
    // SLICE_NAME + '/getList',
    // async (data: GetReportLevelRequest) => {
    //     const response = await apiGetReportLevel<
    //         GetReportLevelResponse,
    //         GetReportLevelRequest
    //     >(data)
    //     return response.data
    // },
)

// export const getMembers = createAsyncThunk(
//     SLICE_NAME + '/getMembers',
//     async () => {
//         const response =
//             await apiGetScrumBoardtMembers<GetScrumBoardtMembersResponse>()
//         const data = response.data.allMembers.map((item) => ({
//             value: item.id,
//             label: item.name,
//             img: item.img,
//         }))
//         return data
//     },
// )

// export const putProject = createAsyncThunk(
//     SLICE_NAME + '/putProject',
//     async (data: PutProjectListRequest) => {
//         const response = await apiPutProjectList<
//             PutProjectListResponse,
//             PutProjectListRequest
//         >(data)
//         return response.data
//     },
// )

const initialState: ReportLevelState = {
    loading: false,
    reportLevel: [],
    // allMembers: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    // newProjectDialog: false,
}

const reportLevelSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        // setSearch: (state, action) => {
        //     state.query.search = action.payload
        // },
        // toggleNewProjectDialog: (state, action) => {
        //     state.newProjectDialog = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                state.reportLevel = action.payload
                state.loading = false
            })
            .addCase(getList.pending, (state) => {
                state.loading = true
            })
        // .addCase(getMembers.fulfilled, (state, action) => {
        //     state.allMembers = action.payload
        // })
        // .addCase(putProject.fulfilled, (state, action) => {
        //     state.projectList = action.payload
        // })
    },
})

export const { toggleView, toggleSort } = reportLevelSlice.actions

export default reportLevelSlice.reducer
