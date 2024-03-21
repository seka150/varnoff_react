import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsInstance } from "../../../utils/axios";

export const getNews = createAsyncThunk(
    'get-news', 
    async (_, {rejectWithValue}) => {
        try {
            const apiKey = '64149b253c4bff0c1111a3e6460a50cff0c7b3d8610fdf8f401689b0c44701f0'
            const news = await newsInstance.get(`news/?lang=EN&api_key=${apiKey}`)
            return news.data.Data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)