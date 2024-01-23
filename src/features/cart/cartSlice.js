import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems"

const initialState = {
    cartItems: cartItems,
    numOfItems: 4,
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
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increaseItem: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount++;
        },
        decreaseItem: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount--;
        },
        totalPayable: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            }) 
            state.numOfItems = amount;
            state.total = total;
            
        }
    }
})

export default cartSlice.reducer;
export const { clearCart, removeItem, increaseItem, decreaseItem, totalPayable } = cartSlice.actions;