import { IProductProps } from "@/pages/products/products";
import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "adminApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
	}),
	tagTypes: ["User", "Products"],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
		getProducts: builder.query<IProductProps[], void>({
			query: () => "client/products",
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetUserQuery, useGetProductsQuery } = api;
