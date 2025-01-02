import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ItemResponse } from "./itemTypes";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getItems: builder.query<
      ItemResponse,
      { name?: string; limit?: number; page?: number }
    >({
      query: ({ name = "", limit = 10, page = 0 }) => ({
        url: "/items",
        method: "GET",
        params: {
          name,
          per_page: limit,
          page,
        },
      }),
    }),
    updateItem: builder.mutation({
      query: ({ editedItem, id }) => ({
        url: `items/${id}`,
        method: "PATCH",
        body: {
          item: editedItem,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetItemsQuery, useUpdateItemMutation } = itemApi;
