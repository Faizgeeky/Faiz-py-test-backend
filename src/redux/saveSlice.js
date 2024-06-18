import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    saveItems: [], // Array of free items
};

const saveSlice = createSlice({
    name: 'saveItems',
    initialState,
    reducers: {
        addSaveItem: (state, action) => {
            state.saveItems.push(action.payload);
        },
        removeSaveItem: (state, action) => {
            state.saveItems = state.saveItems.filter(i => i.id !== action.payload);
        },
        // ... other free item actions (if needed)
    },
});

export const { addSaveItem, removeSaveItem } = saveSlice.actions;
export default saveSlice.reducer;