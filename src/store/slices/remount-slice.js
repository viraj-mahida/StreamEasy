import { createSlice } from "@reduxjs/toolkit";

const remountSlice = createSlice({
    name: 'remountSlice',
    initialState: {
        remountNumber: 0,
    },
    reducers: {
        updateRemountNumber(state){
            state.remountNumber += 1;
        },
    },
})

export const remountSliceAction = remountSlice.actions;
export default remountSlice;