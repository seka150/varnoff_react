import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceData {
    id: string;
    otherParams: any
}

interface ServiceDataState {
    entities: ServiceData[];
    loading: boolean;
    error: string | null;
}

const initialState: ServiceDataState = {
    entities: [],
    loading: false,
    error: null,
};

const serviceDataSlice = createSlice({
    name: 'serviceData',
    initialState,
    reducers: {
        addAssetStart(state) {
            state.loading = true;
            state.error = null;
        },
        addAssetSuccess(state, action: PayloadAction<ServiceData>) {
            state.loading = false;
            state.entities.push(action.payload);
        },
        addAssetFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteAssetStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteAssetSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.entities = state.entities.filter(asset => asset.id !== action.payload);
        },
        deleteAssetFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        editAssetStart(state) {
            state.loading = true;
            state.error = null;
        },
        editAssetSuccess(state, action: PayloadAction<ServiceData>) {
            state.loading = false;
            state.entities = state.entities.map(asset =>
                asset.id === action.payload.id ? action.payload : asset
            );
        },
        editAssetFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    addAssetStart,
    addAssetSuccess,
    addAssetFailure,
    deleteAssetStart,
    deleteAssetSuccess,
    deleteAssetFailure,
    editAssetStart,
    editAssetSuccess,
    editAssetFailure,
} = serviceDataSlice.actions;

export default serviceDataSlice.reducer;
