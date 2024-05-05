import { createSlice, Draft } from "@reduxjs/toolkit";
import { getOrder, createOrder, updateOrderStatus, IGetOrder } from "store/thunks/order";

interface OrderState {
    orders: Draft<IGetOrder>[];
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
            state.orders = action.payload || state.orders;
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
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
            const { orderId, statusId } = action.meta.arg as unknown as { orderId: number; statusId: number };
            const orderIndex = state.orders.findIndex(order => order && order.id === orderId);
            if (orderIndex !== -1) {
                state.orders[orderIndex].statusId = statusId;
            }
        })           
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to update order status";
        });
    }
});

export default orderSlice.reducer;
