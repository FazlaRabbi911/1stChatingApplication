import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("userAppdata") ?  JSON.parse(localStorage.getItem("userAppdata"))
    : null,
    // JSON.parse is converting string to object 
  },
  reducers: {
    activeuser: (state,action) => {
        state.value = action.payload  
    },
  },
})
// Action creators are generated for each case reducer function
export const { activeuser } = counterSlice.actions

export default counterSlice.reducer