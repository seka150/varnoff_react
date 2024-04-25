import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanceAuth } from "utils/axios";

export interface Order {
    title: string,
    description: string,
    userId: number | null,
    serviceId: number,
    statusId: number
}

interface AllOrders {
    order: Order[];
}
export const getOrder = createAsyncThunk<AllOrders[], void, { rejectValue: string }>(
    'get-orders', 
    async (_, {rejectWithValue}) => {
        try {
            const order = await instanceAuth.get('/order/get')
            return order.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)


export const createOrder = createAsyncThunk<Order, Order, { rejectValue: string }>(
    'create-order',
    async (data, { rejectWithValue }) => {
        try {
            const order = await instanceAuth.post('/order/create', data);
            return order.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);