// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import freeReducer from './freeSlice';
import saveReducer from './saveSlice';
// Save cart state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.cart);
        const serializedFreeState = JSON.stringify(state.free);
        const serializedSaveState = JSON.stringify(state.save);


        localStorage.setItem('cartState', serializedState);
        localStorage.setItem('freeState', serializedFreeState);
        localStorage.setItem('saveState', serializedSaveState);


    } catch (err) {
        console.error("Could not save state", err);
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
        free : freeReducer,
        save : saveReducer,
    },
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
