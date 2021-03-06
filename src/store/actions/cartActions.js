// TYPES
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const LIST_CART_PRODUCTS = 'GET_PRODUCTS';
export const INCREASE_CART_PRODUCT_QUANTITY = 'INCREASE_CART_PRODUCT_QUANTITY';
export const DECREASE_CART_PRODUCT_QUANTITY = 'DECREASE_CART_PRODUCT_QUANTITY';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const UPDATE_CART_PRODUCT_QUANTITY = 'UPDATE_CART_PRODUCT_QUANTITY';

// Actions
export const addProductToCart = (product) => ({
    type: ADD_PRODUCT,
    data: product
});
export const removeCartProduct = (product_id, product_size) => ({
    type: REMOVE_PRODUCT,
    product_id: product_id,
    product_size: product_size
});
export const increaseCartProductQuantity = (product_id) => ({
    type: INCREASE_CART_PRODUCT_QUANTITY,
    product_id: product_id,
});

export const updateCartProductQuantity = (product_id, product_size, value) => ({
    type: UPDATE_CART_PRODUCT_QUANTITY,
    product_id: product_id,
    product_size: product_size,
    value: value
});
/*
export const fetchProductsError = (error) => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error
});
*/