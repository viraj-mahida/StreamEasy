import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'authSliceName',
  initialState: {
    user: (typeof window !== 'undefined' && window.localStorage.getItem('userObject') !== null) ? JSON.parse(window.localStorage.getItem('userObject')) : {},
    isLoggedIn: (typeof window !== 'undefined' && window.localStorage.getItem('logInStatus') !== null) ? window.localStorage.getItem('logInStatus') : 'false'
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setLogInStatus(state, action) {
      state.isLoggedIn = action.payload
    },
  }
})

export const authSliceAction = authSlice.actions
export default authSlice