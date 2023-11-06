import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useAppDispatch } from "@/hooks";
import { setMode } from "@/features";
import profileImage from "@/assets/images/profile.jpeg";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IUser } from "@/types/User";

interface INavbarProps {
	user: IUser;
	isSidebarOpen: boolean;
	setIsSidebarOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

const Navbar: React.FC<INavbarProps> = ({
	user,
	setIsSidebarOpen,
}) => {
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<Element | null>(
		null
	);

	const isOpen = Boolean(anchorEl);
	const handleClick = (
		event: React.MouseEvent<HTMLElement>
	) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	return (
		<AppBar
			sx={{
				position: "relative",
				background: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Left Side */}
				<FlexBetween>
					<IconButton
						onClick={() =>
							setIsSidebarOpen((prev) => !prev)
						}
					>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						sx={{
							backgroundColor: theme.palette.background.alt,
							borderRadius: "9px",
							gap: "3rem",
							p: "0.1rem 1.5rem",
							marginLeft: "1rem",
						}}
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>

				{/* Right Side */}
				<FlexBetween>
					{/* Settings */}
					<FlexBetween
						sx={{
							gap: "1.5rem",
						}}
					>
						<IconButton onClick={() => dispatch(setMode())}>
							{theme.palette.mode === "light" ? (
								<LightModeOutlined
									sx={{ fontSize: "25px" }}
								/>
							) : (
								<DarkModeOutlined
									sx={{ fontSize: "25px" }}
								/>
							)}
						</IconButton>
						<IconButton sx={{ marginRight: "20px" }}>
							<SettingsOutlined sx={{ fontSize: "25px" }} />
						</IconButton>
					</FlexBetween>
					<FlexBetween gap="1.5rem">
						<Button
							onClick={handleClick}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								textTransform: "none",
								gap: "1rem",
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{
										color: theme.palette.secondary.main,
									}}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.75rem"
									sx={{
										color: theme.palette.secondary.main,
									}}
								>
									{user.occupation}
								</Typography>
							</Box>
							<ArrowDropDownOutlined
								sx={{
									color: theme.palette.secondary.main,
									fontSize: "25px",
								}}
							/>
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
						>
							<MenuItem onClick={handleClose}>
								Log Out
							</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
