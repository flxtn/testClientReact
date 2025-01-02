import { Order } from "@/app/orders/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
