import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCoverings } from "store/thunks/covering";


export interface ICovering {
    type: string;  
}

interface CoveringState {
    coverings: ICovering[];
    loading: boolean;
    error: string | null;
}

const initialState: CoveringState = {
    coverings: [],
    loading: false,
    error: null,
};

const coveringSlice = createSlice({
    name: "coverings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoverings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCoverings.fulfilled, (state, action: PayloadAction<ICovering[]>) => {
                state.loading = false;
                state.coverings = action.payload;  
            })
            .addCase(getCoverings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка при загрузке данных';
            });
    },
});

export default coveringSlice.reducer;
