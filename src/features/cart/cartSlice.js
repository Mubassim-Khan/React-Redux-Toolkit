import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems"

const initialState = {
    cartItems: cartItems,
    numOfItems: 8,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        }, 
        removeItem: (state, item) => {
            console.log(item)
        }
    }
})

export default cartSlice.reducer;
export const { clearCart, removeItem } = cartSlice.actions;