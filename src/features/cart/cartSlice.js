import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
    cartItems: [],
    numOfItems: 4,
    total: 0,
    isLoading: true
}

/* Imp Points for createAsyncThunk()
- To get the state (or other features of app) we can pass "thunkAPI" parameter to the function.
- Can even use dispatch fuction using thunkAPI.
- To pass the value into other components use paramter 'name'.
*/

export const getCartItems = createAsyncThunk('cart/getCartItems', async (thunkAPI) => {
    try {
        const resp = await axios(url);
        return resp.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue(err.response);
    }
})

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
    },
    extraReducers: builder => {
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        }),
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default cartSlice.reducer;
export const { clearCart, removeItem, increaseItem, decreaseItem, totalPayable } = cartSlice.actions;