// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load cart state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return { cartItems: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return { cartItems: [] };
    }
};

// Initial state
const initialState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        },
        updateCartQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        calculateTotal: (state) => {
            // Calculate total sum of products considering quantity
            state.cartTotal = state.cartItems.reduce((acc, item) => {
                const priceWithoutCurrency = parseFloat(item.price.substring(1)); // Remove leading currency symbol
                return acc + priceWithoutCurrency * item.quantity;
            }, 0); // Initial accumulator for sum
        },
    },
});

export const { addToCart, removeFromCart, updateCartQuantity, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
