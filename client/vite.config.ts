import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";

const env = loadEnv("development", process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"process.env.REACT_APP_API_URL": JSON.stringify(
			env.REACT_APP_API_URL
		),
	},
	plugins: [react(), tsConfigPaths()],
});
