import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the cart
const CartContext = createContext();
const CartDispatchContext = createContext();

const initialState = [];

// Reducer function for handling cart actions
// Reducer function for handling cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((_, index) => index !== action.payload.index);
    case 'DROP':
      return [];
    default:
      return state;
  }
};



// CartProvider component to wrap the application and provide cart context
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
