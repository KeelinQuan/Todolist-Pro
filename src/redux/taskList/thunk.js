import {createAsyncThunk} from '@reduxjs/toolkit'
import { getWarningTasks } from '@/services/task'
export const warningTasksThunk = createAsyncThunk(
    'taskList/warningTasksThunk',
    async (_, thunkAPI) => {
      let res = await getWarningTasks()
      let data = res.data
      return data
    }
)

export default {
  [warningTasksThunk.pending] : (state, action) => {
    state.warningTasks  =  action.payload
  },
  [warningTasksThunk.fulfilled] : (state, action) => {
    state.warningTasks  =  action.payload
  },
  [warningTasksThunk.rejected] : (state, action) => {
    state.warningTasks  =  action.payload
  }
}