import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();
    
export function CartProvider({ children }) {
  const [items, setItems] = useState([]); //items contains a list of ids
  const oldCartData = localStorage.getItem('historied');

  useEffect(()=> {
    if(oldCartData){
      setItems(JSON.parse(oldCartData));
    }
  },[])

  const addToCart = (id) => {
    setItems((prevState) => [...prevState,  id ]);
    const updatedCart = oldCartData ? [...JSON.parse(oldCartData),  id ] : [ id ];
    localStorage.setItem('historied', JSON.stringify(updatedCart));
  };
  

  const removeFromCart = (id) => {
    setItems((prevState) => prevState.filter(item => item != id));
  
    if (oldCartData) {
      const updatedCart = JSON.parse(oldCartData).filter(item => item != id);
      localStorage.setItem('historied', JSON.stringify(updatedCart));
    }
  };
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
  );
}

export default CartContext;