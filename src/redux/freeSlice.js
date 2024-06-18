import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    freeItems: [], // Array of free items
};

const freeSlice = createSlice({
    name: 'free',
    initialState,
    reducers: {
        addFreeItem: (state, action) => {
            state.freeItems.push(action.payload);
        },
        removeFreeItem: (state, action) => {
            state.freeItems = state.freeItems.filter(i => i.id !== action.payload);
        },
        // ... other free item actions (if needed)
    },
});

export const { addFreeItem, removeFreeItem } = freeSlice.actions;
export default freeSlice.reducer;