import React from "react";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SvgIconProps,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/images/profile.jpeg";
import { IUser } from "@/types/User";

interface INavItem {
	text: string;
	icon: React.ReactElement<SvgIconProps> | null;
}
const navItems: INavItem[] = [
	{
		text: "Dashboard",
		icon: <HomeOutlined />,
	},
	{
		text: "Client Facing",
		icon: null,
	},
	{
		text: "Products",
		icon: <ShoppingCartOutlined />,
	},
	{
		text: "Customers",
		icon: <Groups2Outlined />,
	},
	{
		text: "Transactions",
		icon: <ReceiptLongOutlined />,
	},
	{
		text: "Geography",
		icon: <PublicOutlined />,
	},
	{
		text: "Sales",
		icon: null,
	},
	{
		text: "Overview",
		icon: <PointOfSaleOutlined />,
	},
	{
		text: "Daily",
		icon: <TodayOutlined />,
	},
	{
		text: "Monthly",
		icon: <CalendarMonthOutlined />,
	},
	{
		text: "Breakdown",
		icon: <PieChartOutlined />,
	},
	{
		text: "Management",
		icon: null,
	},
	{
		text: "Admin",
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: "Performance",
		icon: <TrendingUpOutlined />,
	},
];

interface ISidebarProps {
	isNonMobile: boolean;
	drawerWidth: string;
	isSidebarOpen: boolean;
	user: IUser;
	setIsSidebarOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

const Sidebar: React.FC<ISidebarProps> = ({
	isNonMobile,
	drawerWidth,
	user,
	isSidebarOpen,
	setIsSidebarOpen,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState("");
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component={"nav"}>
			<Drawer
				open={isSidebarOpen}
				onClose={() => setIsSidebarOpen((prev) => !prev)}
				variant="persistent"
				anchor="left"
				sx={{
					transition: theme.transitions.create(
						["margin", "width"],
						{
							easing: theme.transitions.easing.sharp,
							duration:
								theme.transitions.duration.leavingScreen,
						}
					),
					// https://mui.com/material-ui/react-drawer/#persistent-drawer
					...(isSidebarOpen && {
						width: drawerWidth,
						transition: theme.transitions.create(
							["margin", "width"],
							{
								easing: theme.transitions.easing.easeOut,
								duration:
									theme.transitions.duration.enteringScreen,
							}
						),
					}),

					[`& .MuiDrawer-paper`]: {
						color: theme.palette.secondary.main,
						backgroundColor: theme.palette.background.alt,
						boxSizing: "border-box",
						borderWidth: isNonMobile ? 0 : "2px",
						width: drawerWidth,
					},
				}}
			>
				<Box width={"100%"}>
					<Box m="1.5rem 2rem 2rem 3rem">
						<FlexBetween
							color={theme.palette.secondary.main}
						>
							<Box
								display="flex"
								alignItems="center"
								gap="0.5rem"
							>
								<Typography variant="h5" fontWeight="bold">
									ECOMVISION
								</Typography>
							</Box>
							{isNonMobile && (
								<IconButton
									onClick={() =>
										setIsSidebarOpen((prev) => !prev)
									}
								>
									<ChevronLeft />
								</IconButton>
							)}
						</FlexBetween>
						<List>
							{navItems.map((item) => {
								if (!item.icon) {
									return (
										<Typography
											key={item.text}
											sx={{ m: "2.25rem 0 1rem 3rem" }}
										>
											{item.text}
										</Typography>
									);
								}

								const lcText = item.text.toLowerCase();

								return (
									<ListItem key={item.text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.background
																.default
														: "transparent",
												color:
													active === lcText
														? theme.palette.secondary.main
														: theme.palette.secondary.light,
											}}
										>
											<ListItemIcon
												sx={{
													ml: "2rem",
													color:
														active === lcText
															? theme.palette.secondary.main
															: theme.palette.secondary
																	.main,
												}}
											>
												{item.icon}
											</ListItemIcon>
											<ListItemText primary={item.text} />
											{active === lcText && (
												<ChevronRightOutlined
													sx={{ ml: "auto" }}
												/>
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
					<Box
						position="relative"
						bottom="2rem"
						width={"100%"}
					>
						<Divider />
						<FlexBetween
							textTransform="none"
							gap="1rem"
							m="1.5rem 2rem 0 3rem"
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								<Typography
									fontSize={"0.9rem"}
									sx={{
										color: theme.palette.secondary.main,
									}}
								>
									{user.occupation}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary.main,
								}}
							/>
						</FlexBetween>
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
};

export default Sidebar;
