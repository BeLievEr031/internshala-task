import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITaskData } from '../../components/Table/Table'



export interface IInitial {
    tasks: ITaskData[],
    count: number,
    editTask: ITaskData,
    queryData: IQuery
}


const initialState = {
    tasks: [],
    count: 0,
    editTask: {
        _id: "",
        description: '',
        title: ""
    },
    queryData: {
        page: 1,
        sortType: "A-Z",
        limit: 7,
        filter: "ALL"
    }
} as IInitial

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTask(state, action: PayloadAction<ITaskData[] | null>) {
            state.tasks = action.payload!
        },
        setQueryData(state, action: PayloadAction<IQuery>) {
            state.queryData = action.payload
        },
        setEditValue(state, action: PayloadAction<ITaskData>) {
            state.editTask = action.payload
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        }
    },
})

export const { setTask, setQueryData, setEditValue, setCount } = taskSlice.actions
export default taskSlice.reducer