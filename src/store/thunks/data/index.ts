import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAuth } from 'utils/axios';

interface FetchDataParams {
    url: string;
    otherParams: any; 
}

interface FetchDataParamsId {
    id: number | undefined;
    url: string;
    otherParams: any; 

}


export const getSingleAssets = createAsyncThunk(
    'singleAssets/get',
    async ({ url, otherParams }: FetchDataParams, { rejectWithValue }) => {
        const requestUrl = `/service/${url}/get`;
        console.log('Request URL:', requestUrl);
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



export const postAsset = createAsyncThunk(
    'assets/post',
    async (assetData: FetchDataParams, { rejectWithValue }) => {
        const { url, otherParams } = assetData;
        console.log("Request data:", assetData);

        if (!otherParams) {
            throw new Error('Не все параметры были переданы');
        }
        
        try {
            const response = await instanceAuth.post(`/service/${url}/create`, otherParams);
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

export const updateAsset = createAsyncThunk(
    'assets/update',
    async (assetData: FetchDataParamsId, { rejectWithValue }) => {
        const { id, url, otherParams } = assetData;
        
        try {
            const requestData: any = {};
            for (const key in otherParams) {
                if (Object.prototype.hasOwnProperty.call(otherParams, key)) {
                    requestData[key] = otherParams[key];
                }
            }
            const response = await instanceAuth.patch(`/service/${url}/update/${id}`, requestData);
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
    async ({ id, url }: { id: number; url: string }, { rejectWithValue }) => {
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