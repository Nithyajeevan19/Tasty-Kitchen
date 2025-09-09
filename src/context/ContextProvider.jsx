import { createContext } from 'react'
export const cartContainer=createContext();
import { useState } from 'react';
export function CartContextProvider({children}){
    const [showFoodItems,setShowFoodItems]=useState(true)
    return(
        <cartContainer.Provider value={{showFoodItems,setShowFoodItems}}>
            {children}
        </cartContainer.Provider>
    )
}

