import { createSlice } from '@reduxjs/toolkit'
import thunk from './thunk'
const initialState = {
    countReloadTaskList: 0,
    filters: {
        startDate: null,
        endDate: null
    },
    warningTasks: []
}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    reloadTaskList: (state)=>{
      state.countReloadTaskList++
    },
    updateFilterDate: (state, action)=>{
        state.filters.startDate = action?.payload?.startDate
        state.filters.endDate = action?.payload?.endDate
    }
  },
  extraReducers: thunk
})

export const { reloadTaskList, updateFilterDate } = taskListSlice.actions
export default taskListSlice.reducer