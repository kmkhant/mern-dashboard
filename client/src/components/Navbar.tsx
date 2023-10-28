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
	IconButton,
	InputBase,
	Toolbar,
	useTheme,
} from "@mui/material";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const theme = useTheme();

	return (
		<AppBar
			sx={{
				position: "static",
				background: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Left Side */}
				<FlexBetween>
					<IconButton
						onClick={() =>
							console.log("open/close sidebar")
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
						}}
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
