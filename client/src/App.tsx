import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { RootState } from "./store";
import { useMemo } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Layout from "@/pages/layout";
import { useAppSelector } from "./hooks";

function App() {
	const mode = useAppSelector(
		(state: RootState) => state.global.mode
	);
	const theme = useMemo(
		() => createTheme(themeSettings(mode)),
		[mode]
	);
	return (
		<div className="app">
			<BrowserRouter>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Routes>
						<Route element={<Layout />}>
							<Route
								path="/"
								element={
									<Navigate to="/dashboard" replace />
								}
							/>
							<Route
								path="/dashboard"
								element={<Dashboard />}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
