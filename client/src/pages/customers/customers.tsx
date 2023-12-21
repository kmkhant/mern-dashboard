import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "@/features/api";
import Header from "@/components/Header";
import {
	DataGrid,
	GridRenderCellParams,
} from "@mui/x-data-grid";

export interface ICustomer {
	_id: string;
	name: string;
	email: string;
	city: string;
	state: string | null;
	country: string;
	occupation: string;
	phoneNumber: string;
	transaction: string[];
	role: string;
}

const Customers = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetCustomersQuery();

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			flex: 0.5,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "city",
			headerName: "City",
			flex: 0.4,
		},
		{
			field: "state",
			headerName: "State",
			flex: 0.3,
		},
		{
			field: "country",
			headerName: "Country",
			flex: 0.3,
		},
		{
			field: "occupation",
			headerName: "Occupation",
			flex: 0.5,
		},
		{
			field: "phoneNumber",
			headerName: "Phone Number",
			flex: 0.5,
			renderCell: (
				params: GridRenderCellParams<ICustomer, string>
			) => {
				if (params.value !== undefined)
					return params.value.replace(
						/^(\d{3})(\d{3})(\d{4})/,
						"($1)$2-$3"
					);
			},
		},
		{
			field: "role",
			headerName: "Role",
			flex: 0.5,
		},
	];
	return (
		<Box m="2rem">
			<Header
				title="CUSTOMERS"
				subtitle="List of Customers"
			/>
			<Box
				height={"80vh"}
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
					rows={data || []}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default Customers;
