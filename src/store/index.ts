import {configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth";
import watchlistSlice from "./slice/watchlist";
import  serviceSlice  from "./slice/service";
import { serviceDataSlice } from "./slice/data";
import  orderSlice  from "./slice/order";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        watchlist : watchlistSlice,
        service: serviceSlice,
        serviceData: serviceDataSlice.reducer,
        order: orderSlice
    }
}) 

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof  store.getState>


export default store