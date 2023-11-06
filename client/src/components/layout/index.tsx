import { useState } from "react";
import {
	Box,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { useGetUserQuery } from "@/features/api";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LoadingScreen from "../LoadingScreen";

const Layout = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const userId = useAppSelector(
		(state) => state.global.userId
	);

	const { data: user } = useGetUserQuery(userId);

	if (!user) {
		// new Promise((resolve) => setTimeout(resolve, 1000));
		return <LoadingScreen />;
	}
	return (
		<Box
			sx={{
				display: isNonMobile ? "flex" : "block",
				backgroundColor: theme.palette.background.default,
			}}
			width="100%"
		>
			<Sidebar
				user={user}
				isNonMobile={isNonMobile}
				drawerWidth="350px"
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box sx={{ width: "100%" }}>
				<Navbar
					user={user}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
