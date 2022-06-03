import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        value: []
    },
    reducers: {
        addMessage: (state, action) => {
            var value = action.payload;
            state.value = [...state.value, value];
        }
    }
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer
