import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanceAuth } from "utils/axios";

export interface IOrder {
    title: string;
    description: string;
    userId: number | null;
    serviceId: number;
    statusId: number;
}

export interface IGetOrder {
    id: number,
    title: string;
    description: string;
    userId: number | null;
    serviceId: number;
    statusId: number;
}

export const getOrder = createAsyncThunk<IGetOrder[], void, { rejectValue: string }>(
    'get-orders', 
    async (_, {rejectWithValue}) => {
        try {
            const response = await instanceAuth.get('/order/get');
            const orders: IGetOrder[] = response.data.orders;
            return orders;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const createOrder = createAsyncThunk<IGetOrder, IOrder, { rejectValue: string }>(
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

export const updateOrderStatus = createAsyncThunk<IGetOrder, { orderId: number; statusId: number }, { rejectValue: string }>(
    'orders/updateOrderStatus',
    async ({ orderId, statusId }, { rejectWithValue }) => {
        try {
            const response = await instanceAuth.patch(`order/update/${orderId}`, { statusId });
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

