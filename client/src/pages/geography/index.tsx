import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "@/features/api";
import Header from "@/components/Header";
import { geoData } from "@/features/geoData";
import { ResponsiveChoropleth } from "@nivo/geo";

const Geography = () => {
	const theme = useTheme();
	const { data } = useGetGeographyQuery();

	return (
		<Box m="2rem">
			<Header
				title="GEOGRAPHY"
				subtitle="Find where your users are located."
			/>
			<Box
				mt="40px"
				height="75vh"
				border={`1px solid ${theme.palette.secondary.main}`}
				borderRadius={"4px"}
			>
				{data ? (
					<ResponsiveChoropleth
						data={data}
						features={geoData.features}
						margin={{
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						}}
						colors="nivo"
						domain={[0, 1000000]}
						unknownColor="#ada4c1"
						label="properties.name"
						valueFormat=".2s"
						projectionTranslation={[0.5, 0.5]}
						projectionRotation={[0, 0, 0]}
						enableGraticule={true}
						graticuleLineColor="#dddddd"
						borderWidth={0.5}
						borderColor="#152538"
						legends={[
							{
								anchor: "bottom-left",
								direction: "column",
								justify: true,
								translateX: 20,
								translateY: -50,
								itemsSpacing: 0,
								itemWidth: 94,
								itemHeight: 18,
								itemDirection: "left-to-right",
								itemTextColor: "#444444",
								itemOpacity: 0.85,
								symbolSize: 18,
								effects: [
									{
										on: "hover",
										style: {
											itemTextColor: "#000000",
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				) : (
					<div>NO DATA</div>
				)}
			</Box>
		</Box>
	);
};

export default Geography;
