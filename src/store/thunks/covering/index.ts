import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanceAuth } from "utils/axios";

export interface ICovering {
    type: string;
}

export const getCoverings = createAsyncThunk<ICovering[], void, { rejectValue: string }>(
    'get-coverings', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await instanceAuth.get('/covering/get');  
            const coverings: ICovering[] = response.data.type; 
            return coverings;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
