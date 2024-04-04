import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    tintatin:"hhh"
  },
  reducers: {
    activeuser: (state) => {
        console.log("yess")
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeuser } = counterSlice.actions

export default counterSlice.reducer