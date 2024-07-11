import { createSlice } from '@reduxjs/toolkit'

export const massageActive = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("userAppdata") ? JSON.parse(localStorage.getItem("ActiveuserForTextBox"))
    :null
    
  },
  reducers: {
    msgActive: (state,action) => {
        state.value = action.payload  
        console.log(action.payload)
    },
  },
})
// Action creators are generated for each case reducer function
export const { msgActive } = massageActive.actions

export default massageActive.reducer