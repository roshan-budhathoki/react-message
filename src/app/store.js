import { configureStore } from '@reduxjs/toolkit'
import messageSlice from '../features/messageSlice'
export default configureStore({
    reducer: {
        message: messageSlice,
    },
})