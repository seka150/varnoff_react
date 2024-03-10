import { createSlice } from "@reduxjs/toolkit"
import { getWathclistElements } from "../../thunks/watchlist"


const initialState: any = {
    assets: []
}

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWathclistElements.fulfilled, (state, action) => {
            state.assets = action.payload
        })
    },
})

export default watchlistSlice.reducer