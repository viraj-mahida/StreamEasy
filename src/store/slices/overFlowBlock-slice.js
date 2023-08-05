import { createSlice } from "@reduxjs/toolkit";

const overflowBlockSlice = createSlice({
    name: 'overflowBlockSliceName',
    initialState: {
        overflowBlockState: false
    },
    reducers: {
        overflowBlockReducer(state, action){
            state.overflowBlockState = action.payload;
        }
    }
})

export const overflowBlockSliceActions = overflowBlockSlice.actions;
export default overflowBlockSlice;