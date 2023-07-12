import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Customers",
    "Products",
    "Transactions",
    "Geography",
    "OverallStats",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/user/${id}`,
      provideTags: ["User"],
    }),
    getCustomers: build.query({
      query: () => "users/customers",
      provideTags: ["Customers"],
    }),
    getProducts: build.query({
      query: () => "products/",
      provideTags: ["Products"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "transactions/",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      provideTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "users/geography",
      provideTags: ["Geography"],
    }),
    getOverallStats: build.query({
      query: () => "stats/overallStats",
      provideTags: ["OverallStats"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetOverallStatsQuery,
} = api;
