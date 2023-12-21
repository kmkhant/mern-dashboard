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

// Pages
import Dashboard from "@/pages/dashboard/dashboard";
import Products from "@/pages/products/products";
import Customers from "@/pages/customers/customers";
import Transaction from "@/pages/transaction/transactions";

// Components
import Layout from "@/components/layout";
import { useAppSelector } from "./hooks";
import Geography from "./pages/geography";
import Overview from "./pages/overview/overview";

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
							<Route
								path="/products"
								element={<Products />}
							/>
							<Route
								path="/customers"
								element={<Customers />}
							/>
							<Route
								path="/transactions"
								element={<Transaction />}
							/>
							<Route
								path="/geography"
								element={<Geography />}
							/>
							<Route
								path="/overview"
								element={<Overview />}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
