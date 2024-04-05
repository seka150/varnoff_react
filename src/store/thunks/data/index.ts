import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAuth } from 'utils/axios';

interface FetchDataParams {
    url: string;
    otherParams: any; 
}


export const getSingleAssets = createAsyncThunk(
    'singleAssets/get',
    async ({ url, otherParams }: FetchDataParams, { rejectWithValue }) => {
        const requestUrl = `/service/${url}/get`;
        console.log('Request URL:', requestUrl); // Выводим URL в консоль перед отправкой запроса

        try {
            const response = await instanceAuth.get(requestUrl, { params: otherParams });
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


export const addAsset = createAsyncThunk(
    'assets/add',
    async (assetData: FetchDataParams, { rejectWithValue }) => {
        const { url, otherParams } = assetData; // Деструктурируем параметры
        try {
            const response = await instanceAuth.post(`/service/${url}/post`, otherParams); // Используем otherParams
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


export const deleteAssets = createAsyncThunk(
    'assets/delete',
    async ({ id, url }: { id: string; url: string }, { rejectWithValue }) => {
        try {
            await instanceAuth.delete(`/service/${url}/delete/${id}`);
            return id; 
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);