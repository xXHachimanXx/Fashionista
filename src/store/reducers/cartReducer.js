import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_CART_PRODUCT_QUANTITY
} from '../actions/cartActions';

import {
  stringToReal
} from "../../utils/converters";

export const INITIAL_STATE = {
  cart: [],
  total_value: 0.0,
  counter: 0
};


// falta melhorias
export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case ADD_PRODUCT:
      state.total_value += stringToReal(action.data.product_info.actual_price);
      return {
        ...state,
        cart: [...state.cart, action.data],
        counter: ++state.counter
      }

    case REMOVE_PRODUCT:
      const productToRemove = state.cart.find(product =>
        (product.product_info.code_color === action.product_id) &&
        (product.product_info.size === action.product_size)
      );

      const newTotalValue = productToRemove.quantity * 
        stringToReal(productToRemove.product_info.actual_price);

      const newCart = state.cart.filter(product =>
        ((product.product_info.code_color !== action.product_id) ||
         (product.product_info.size !== action.product_size))
      );
      
      return {
        ...state,
        counter: state.counter -= productToRemove.quantity,
        cart: newCart,
        total_value: state.total_value - newTotalValue
      }

    case UPDATE_CART_PRODUCT_QUANTITY:
      var q = state.cart.find(product =>
        (product.product_info.code_color === action.product_id) &&
        (product.product_info.size === action.product_size)
      );

      // Se não existir um produto no carrinho...
      if (q.quantity === 0) {
        if (action.value > 0) {
          state.cart.find(product =>
            product.product_info.code_color === action.product_id &&
            (product.product_info.size === action.product_size)
          ).quantity += action.value;
        }
      }
      // se existir ...
      else {
        state.cart.find(product =>
          product.product_info.code_color === action.product_id &&
          (product.product_info.size === action.product_size)
        ).quantity += action.value;
      }

      // Se for incremento...
      if (action.value > 0) {
        state.total_value += stringToReal(q.product_info.actual_price);
        ++state.counter;
      }
      // Se for decremento...
      else {
        state.total_value -= stringToReal(q.product_info.actual_price);
        --state.counter;
      }

      return {
        ...state,
      }

    default:
      return state;
  }
}