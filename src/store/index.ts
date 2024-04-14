import {configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth";
import watchlistSlice from "./slice/watchlist";
import  newsSlice  from "./slice/news";
import  serviceSlice  from "./slice/service";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        watchlist : watchlistSlice,
        news: newsSlice,
        service: serviceSlice
    }
}) 

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof  store.getState>


export default store