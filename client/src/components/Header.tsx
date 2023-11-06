import { Typography, Box, useTheme } from "@mui/material";

const Header = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => {
	const theme = useTheme();
	return (
		<Box sx={{ m: "1rem 2rem" }}>
			<Typography
				variant="h2"
				color={theme.palette.secondary.main}
				fontWeight="bold"
				sx={{ mb: "5px" }}
			>
				{title}
			</Typography>
			<Typography
				variant="h5"
				color={theme.palette.secondary.main}
				fontWeight="semibold"
			>
				{subtitle}{" "}
			</Typography>
		</Box>
	);
};

export default Header;
