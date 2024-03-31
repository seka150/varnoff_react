import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanceAuth } from "../../../utils/axios";
import { ISingleAssetsService } from "common/types/service";

export const getService = createAsyncThunk<ISingleAssetsService[], void, { rejectValue: string }>(
    'get-service', 
    async (_, {rejectWithValue}) => {
        try {
            const service = await instanceAuth.get('/service/get')
            return service.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

