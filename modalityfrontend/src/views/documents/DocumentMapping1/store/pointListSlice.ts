import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { apiGetPointList } from '@/services/PointListService'

const dummyPointListData = [
    {
        id: 3,
        type: 'Question',
        desc: 'Revenue Strategy: What strategic initiatives are in place to address the decline in product revenue from $316,199 million in 2022 to $298,085 million in 2023? Are there plans to diversify or innovate within the product segment to boost sales?',
        status: 'Open',
    },
    {
        id: 2,
        type: 'Question',
        desc: 'Cost Management: Given the increase in the cost of sales from $214,137 million in 2022 to $223,546 million in 2023, what specific measures are being taken to manage and reduce these costs? Are there any particular areas where the company sees potential for cost optimization without compromising product quality?',
        status: 'Open',
    },
    {
        id: 1,
        type: 'Insight',
        desc: 'Apple Inc.s gross margin for the twelve months ended September 30, 2023, decreased compared to the same period in 2022. Despite a slight increase in services revenue, the overall reduction in net sales and increased cost of sales contributed to this decline.',
        status: 'Open',
    },
    {
        id: 5,
        type: 'Question',
        desc: 'Revenue Strategy: What strategic initiatives are in place to address the decline in product revenue from $316,199 million in 2022 to $298,085 million in 2023? Are there plans to diversify or innovate within the product segment to boost sales?',
        status: 'Open',
    },
    {
        id: 4,
        type: 'Question',
        desc: 'Cost Management: Given the increase in the cost of sales from $214,137 million in 2022 to $223,546 million in 2023, what specific measures are being taken to manage and reduce these costs? Are there any particular areas where the company sees potential for cost optimization without compromising product quality?',
        status: 'Open',
    },
    {
        id: 6,
        type: 'Insight',
        desc: 'Apple Inc.s gross margin for the twelve months ended September 30, 2023, decreased compared to the same period in 2022. Despite a slight increase in services revenue, the overall reduction in net sales and increased cost of sales contributed to this decline.',
        status: 'Open',
    },
]

// type Member = {
//     id: string
//     n@/services/PointListService
//     email: string
//     img: string
// }

type Points = {
    id: number
    desc: string
    type: string
    status: string
    // attachmentCount: number
    // totalTask: number
    // completedTask: number
    // progression: number
    // dayleft: number
    // status: string
    // member: Omit<Member, 'id' | 'email'>[]
}

type PointList = Points[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetPointListRequest = Query

type GetPointListResponse = PointList

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

export type PointListState = {
    loading: boolean
    pointList: PointList
    // allMembers: {
    //     value: string
    //     label: string
    //     img: string
    // }[]
    view: 'grid' | 'list'
    query: Query
    // newProjectDialog: boolean
}

export const SLICE_NAME = 'pointList'

export const getList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Return dummy data
        return dummyPointListData
    },

    //ENABLE THIS
    // SLICE_NAME + '/getList',
    // async (data: GetPointListRequest) => {
    //     const response = await apiGetPointList<
    //         GetPointListResponse,
    //         GetPointListRequest
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

const initialState: PointListState = {
    loading: false,
    pointList: [],
    // allMembers: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    // newProjectDialog: false,
}

const pointListSlice = createSlice({
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
                state.pointList = action.payload
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

export const { toggleView, toggleSort } = pointListSlice.actions

export default pointListSlice.reducer
