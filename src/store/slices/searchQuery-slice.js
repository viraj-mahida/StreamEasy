import { createSlice } from "@reduxjs/toolkit";

const searchQuerySlice = createSlice({
    name: "searchQuerySlice",
    
    initialState: {
        // searchQueryState: '',
        searchQueryState: (typeof window !== 'undefined') ? window.localStorage.getItem('searchQuery') : '',
    },

    reducers: {
        storeSearchQuery(state, action) {
            state.searchQueryState = action.payload;
        },
    },
})

export const searchQuerySliceAction = searchQuerySlice.actions;
export default searchQuerySlice;