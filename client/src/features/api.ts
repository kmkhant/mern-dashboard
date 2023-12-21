import { IProductProps } from "@/pages/products/products";
import { ICustomer } from "@/pages/customers/customers";
import { ITransactions } from "@/pages/transaction/transactions";
interface ITransactionQuery {
	page: number;
	pageSize: number;
	sort: string;
}

interface IMonthlyData {
	month: string;
	totalSales: number;
	totalUnits: number;
}

interface IDailyData {
	totalSales: number;
	totalUnits: number;
}

interface IData {
	totalCustomers: number;
	yearlySalesTotal: number;
	yearlyTotalSoldUnits: number;
	year: number;
	monthlyData: IMonthlyData[];
	dailyData: IDailyData[];
	salesByCategory: {
		shoes: number;
		clothing: number;
		accessories: number;
		misc: number;
	};
}

import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "adminApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
	}),
	tagTypes: [
		"User",
		"Products",
		"Customers",
		"Geography",
		"Sales",
	],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
		getProducts: builder.query<IProductProps[], void>({
			query: () => "client/products",
			providesTags: ["Products"],
		}),
		getCustomers: builder.query<ICustomer[], void>({
			query: () => "client/customers",
			providesTags: ["Customers"],
		}),
		getTransactions: builder.query<
			ITransactions,
			ITransactionQuery
		>({
			query: ({
				page,
				pageSize,
				sort,
			}: {
				page: number;
				pageSize: number;
				sort: string;
			}) => ({
				url: "client/transactions",
				method: "GET",
				params: {
					page,
					pageSize,
					sort,
				},
			}),
		}),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getGeography: builder.query<any, void>({
			query: () => "client/geography",
			providesTags: ["Geography"],
		}),
		getSales: builder.query<IData, void>({
			query: () => "/sales",
			providesTags: ["Sales"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetGeographyQuery,
	useGetSalesQuery,
} = api;
