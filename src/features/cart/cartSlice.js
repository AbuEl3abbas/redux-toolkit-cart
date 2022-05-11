import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', 
    async (name, thunkAPI) => {

    try {

        const response = await axios(url);

        return response.data;

    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }

});

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            return {
                ...state,
                cartItems: [],
                amount: 0,

            }
        },
        removeItem: (state, { payload }) => {

            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== payload),
                amount: state.cartItems.length - 1
            }

        },
        increase: (state, { payload }) => {
            state.cartItems.forEach(e => {
                if (e.id === payload) {
                    (++e.amount)
                }
            });

        },
        decrease: (state, { payload }) => {
            state.cartItems.forEach(e => {
                if (e.id === payload) {
                    (--e.amount)
                }
            })
        },
        calculateTotalAndAmount: (state) => {
            let total = 0;
            let amount = 0
            state.cartItems.forEach((e) => {
                amount += e.amount;
                total += e.amount * e.price;
            })
            return {
                ...state,
                amount: amount,
                total: total
            }
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
            //console.log(action);
        },
    }
});
//console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotalAndAmount } = cartSlice.actions

export default cartSlice.reducer;