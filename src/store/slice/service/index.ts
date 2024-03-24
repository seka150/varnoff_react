import { createSlice } from '@reduxjs/toolkit'
import { getService } from '../../thunks/service'

const initialState: any= {
    service: [],
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getService.fulfilled, (state, action) => {
            state.service = action.payload 
        })
    },
})

export default serviceSlice.reducer
