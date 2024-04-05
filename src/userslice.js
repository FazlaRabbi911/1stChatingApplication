import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    activeuser: (state,action) => {
        state.value = action.payload
        console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeuser } = counterSlice.actions

export default counterSlice.reducer