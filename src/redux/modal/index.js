import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showDetailTaskModal: false,
    dataDetailTaskModal: {}
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action)=>{
        state.showDetailTaskModal = true
        state.dataDetailTaskModal = action.payload
    },
    closeModal: (state)=>{
        state.showDetailTaskModal = false
    }
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer