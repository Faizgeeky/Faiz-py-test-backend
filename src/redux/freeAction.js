// src/redux/cart/cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

export const addToFree = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromFree = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

// export const updateCartQuantity = (productId, quantity) => ({
//     type: UPDATE_CART_QUANTITY,
//     payload: { productId, quantity }
// });
