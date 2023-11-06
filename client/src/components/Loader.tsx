import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				m: "1.5rem 2rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "80vh",
			}}
		>
			<Bars
				height="40"
				width="40"
				color={theme.palette.primary.light}
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</Box>
	);
};

export default Loader;
