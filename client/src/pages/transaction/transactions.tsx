import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "@/features/api";
import React, { useState } from "react";
import {
	DataGrid,
	GridRenderCellParams,
	GridSortModel,
} from "@mui/x-data-grid";
import Header from "@/components/Header";

interface ITransaction {
	_id: string;
	userId: string;
	products: string[];
	cost: number;
}

export interface ITransactions {
	total: number;
	transactions: ITransaction[];
}

const Transactions = () => {
	const theme = useTheme();

	const [sort, setSort] = useState<
		GridSortModel | undefined
	>();

	// values to send backend
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 20,
	});

	const { data, isLoading } = useGetTransactionsQuery({
		page: paginationModel.page,
		pageSize: paginationModel.pageSize,
		sort: JSON.stringify(sort),
	});

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "CreatedAt",
			flex: 1,
		},
		{
			field: "products",
			headerName: "# of Products",
			flex: 0.5,
			sortable: false,
			renderCell: (
				params: GridRenderCellParams<ITransaction, string[]>
			) => {
				if (params.value !== undefined)
					return params.value.length;
			},
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 1,
			renderCell: (
				params: GridRenderCellParams<ITransaction, string>
			) => {
				if (params.value !== undefined)
					return `$${Number(params.value).toFixed(2)}`;
			},
		},
	];

	return (
		<Box m="2rem">
			<Header
				title="TRANSACTIONS"
				subtitle="Entire list of transactions"
			/>
			<Box
				height="80vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
						// backgroundColor: theme.palette.primary.main,
						color: theme.palette.secondary.main,
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						// backgroundColor: theme.palette.primary.main,
					},
					"& .MuiDataGrid-FooterContainer": {
						backgroundColor: theme.palette.primary.main,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					rows={(data && data.transactions) || []}
					rowCount={(data && data.total) || 0}
					columns={columns}
					pageSizeOptions={[20, 50, 100]}
					paginationMode="server"
					sortingMode="server"
					pagination
					paginationModel={paginationModel}
					onPaginationModelChange={setPaginationModel}
					sortModel={sort}
					onSortModelChange={setSort}
				/>
			</Box>
		</Box>
	);
};

export default Transactions;
