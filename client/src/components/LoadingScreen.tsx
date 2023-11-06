import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { Bars } from "react-loader-spinner";

import React from "react";

const LoadingScreen = () => {
	const theme = useTheme();

	return (
		<main>
			<Box
				sx={{
					height: "100vh",
					width: "100vw",
					backgroundColor: theme.palette.background.default,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Bars
					height="100"
					width="100"
					color={theme.mode === "light" ? "#000" : "#fff"}
					ariaLabel="bars-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</Box>
		</main>
	);
};

export default LoadingScreen;
