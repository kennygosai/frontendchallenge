/*
 * Filename: \client\src\app\store.js
 * Created Date: Friday, January 8th 2021
 * Author: Kenny Gosai
 */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
