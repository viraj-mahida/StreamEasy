import { configureStore } from "@reduxjs/toolkit";
import listVideosSlice from './slices/listVideos-slice'
import searchQuerySlice from "./slices/searchQuery-slice";
import remountSlice from "./slices/remount-slice";
import authSlice from "./slices/auth-slice";
import overflowBlockSlice from './slices/overFlowBlock-slice';

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    listVideosSlice: listVideosSlice.reducer,
    searchQuerySlice: searchQuerySlice.reducer,
    remountSlice: remountSlice.reducer,
    overflowBlockSlice: overflowBlockSlice.reducer,
  },
})

export default store;