import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/sign_in",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/users/current",
    }),
    getAllUsers: builder.query<any, void>({
      query: () => "users",
    }),
    updateUserProfile: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: {
          user: formData,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/users/sign_out",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
  useLogoutMutation,
} = apiSlice;
