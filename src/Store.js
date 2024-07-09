import { configureStore } from '@reduxjs/toolkit'
import userslice from './userslice'
import massageActiveslice from './massageActiveslice'

export default configureStore({
  reducer: {
    storeuser : userslice,
    msgactive:massageActiveslice
  },
})