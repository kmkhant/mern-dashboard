import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import Navbar from "@/components/Navbar";

const Layout = () => {
	return (
		<Box width="100%" height="100%">
			<Navbar />
			<Outlet />
		</Box>
	);
};

export default Layout;
