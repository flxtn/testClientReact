import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { itemApi } from "./features/items/itemApi";
import { ordersApi } from "./features/orders/orderApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      itemApi.middleware,
      ordersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
