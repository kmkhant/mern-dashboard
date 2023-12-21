import React, { useMemo } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "@/features/api";

const OverviewChart: React.FC<{
	isDashboard: boolean;
	view: string;
}> = ({ isDashboard = false, view }) => {
	const theme = useTheme();
	const { data, isLoading } = useGetSalesQuery();

	const [totalSalesLine, totalUnitsLine] = useMemo(() => {
		if (!data) return [];

		const { monthlyData } = data;

		const totalSalesLine: Serie = {
			id: "totalSales",
			data: [],
		};

		const totalUnitsLine: Serie = {
			id: "totalUnits",
			data: [],
		};

		Object.values(monthlyData).reduce(
			(acc, { month, totalSales, totalUnits }) => {
				const curSales: number = acc.sales + totalSales;
				const curUnits: number = acc.units + totalUnits;

				totalSalesLine.data = [
					...totalSalesLine.data,
					{ x: month, y: curSales },
				];

				totalUnitsLine.data = [
					...totalUnitsLine.data,
					{ x: month, y: curUnits },
				];

				return { sales: curSales, units: curUnits };
			},
			{ sales: 0, units: 0 }
		);

		return [[totalSalesLine], [totalUnitsLine]];
	}, [data, theme.palette.secondary.main]);

	if (
		!data ||
		isLoading ||
		totalSalesLine === undefined ||
		totalUnitsLine === undefined
	)
		return <div>Loading...</div>;

	return (
		<ResponsiveLine
			data={
				view === "sales" ? totalSalesLine : totalUnitsLine
			}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: theme.palette.secondary.main,
						},
					},
					legend: {
						text: {
							fill: theme.palette.secondary.main,
						},
					},
					ticks: {
						line: {
							stroke: theme.palette.secondary.main,
							strokeWidth: 1,
						},
						text: {
							fill: theme.palette.secondary.main,
						},
					},
				},
				legends: {
					text: {
						fill: theme.palette.secondary.main,
					},
				},
				tooltip: {
					container: {
						color: theme.palette.primary.main,
					},
				},
			}}
			margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				stacked: false,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="catmullRom"
			enableArea={isDashboard}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: (v) => {
					if (isDashboard) return v.slice(0, 3);
					return v;
				},
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? "" : "Month",
				legendOffset: 36,
				legendPosition: "middle",
			}}
			axisLeft={{
				tickValues: 5,
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard
					? ""
					: `Total ${
							view === "sales" ? "Revenue" : "Units"
					  } for Year`,
				legendOffset: -60,
				legendPosition: "middle",
			}}
			enableGridX={false}
			enableGridY={false}
			pointSize={10}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={
				!isDashboard
					? [
							{
								anchor: "bottom-right",
								direction: "column",
								justify: false,
								translateX: 30,
								translateY: -40,
								itemsSpacing: 0,
								itemDirection: "left-to-right",
								itemWidth: 80,
								itemHeight: 20,
								itemOpacity: 0.75,
								symbolSize: 12,
								symbolShape: "circle",
								symbolBorderColor: "rgba(0, 0, 0, .5)",
								effects: [
									{
										on: "hover",
										style: {
											itemBackground: "rgba(0, 0, 0, .03)",
											itemOpacity: 1,
										},
									},
								],
							},
					  ]
					: undefined
			}
		/>
	);
};

export default OverviewChart;
