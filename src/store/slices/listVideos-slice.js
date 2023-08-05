import { createSlice } from "@reduxjs/toolkit";

const listVideosSlice = createSlice({
    name: "listVideosSliceName",
    initialState: {
        listHomeVideosState: [],
        // videoId: '',
        videoId: (typeof window !== 'undefined' && window.localStorage.getItem('videoId')) ?? '',
        pageToken: null,
        listSearchVideosState: [],
        listCategoriesState: [],
        activeCategory: 999,
        listRelatedVideosState: [],
        activeSection: "Home"
    },
    reducers: {
        listHomeVideosReducer(state, action) {
            state.listHomeVideosState = action.payload;
        },
        storeVideoIdReducer(state, action) {
            state.videoId = action.payload;
        },
        savePageTokenReducer(state, action) {
            state.pageToken = action.payload;
        },
        listSearchVideosReducer(state, action) {
            state.listSearchVideosState = action.payload; 
        },
        listCategoriesReducer(state, action) {
            state.listCategoriesState = action.payload;
        },
        saveActiveCategoriReducer(state, action) {
            state.activeCategory = action.payload;
        },
        listRelatedVideosReducer(state, action) {
            state.listRelatedVideosState = action.payload;
        },
        saveActiveSectionReducer(state, action) {
            state.activeSection = action.payload;
        },
    },
})

export const listVideosSliceAction = listVideosSlice.actions;
export default listVideosSlice;