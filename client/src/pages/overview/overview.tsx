import React, { useState } from "react";
import {
	FormControl,
	MenuItem,
	InputLabel,
	Box,
	Select,
} from "@mui/material";
import Header from "@/components/Header";
import OverviewChart from "@/components/OverviewChart";

const Overview = () => {
	const [view, setView] = useState<string>("units");

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="OVERVIEW"
				subtitle="Overview of general revenue and profit"
			/>
			<Box height="100vh" paddingBottom="80px">
				<FormControl sx={{ mt: "1rem" }}>
					<InputLabel>View</InputLabel>
					<Select
						value={view}
						label="View"
						onChange={(e) => setView(e.target.value)}
					>
						<MenuItem value="sales">Sales</MenuItem>
						<MenuItem value="units">Units</MenuItem>
					</Select>
				</FormControl>
				<OverviewChart isDashboard={false} view="view" />
			</Box>
		</Box>
	);
};

export default Overview;
