/*
 * Filename: \client\src\features\usersSlice.js
 * Created Date: Friday, January 8th 2021
 * Author: Kenny Gosai
 */

import { createSlice } from '@reduxjs/toolkit';

/*
 * Redux State Management for the User data Fetched
 */
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    userData: []
  },
  reducers: {
    usersLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.userData = action.payload
      }
    }
  }
})

export const { usersLoading, usersReceived } = usersSlice.actions

export const userValues = state => state.users.userData;
export const loadingValues = state => state.users.loading;

export default usersSlice.reducer;
