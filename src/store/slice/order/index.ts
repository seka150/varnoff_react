import { createSlice} from "@reduxjs/toolkit";
import { createOrder, getOrder, Order } from "store/thunks/order";

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
};

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload ? action.payload[0].order : [];
        })
        .addCase(getOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch orders";
        })
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders.push(action.payload);
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to create order";
        });
    }
});

export default orderSlice.reducer;
