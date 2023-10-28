interface CustomPalettes {
	mode: PaletteMode;
	primary: {
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
		800: string;
		900: string;
		main: string;
		light: string;
	};
	secondary: {
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
		800: string;
		900: string;
		main: string;
	};
	neutral: {
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
		800: string;
		900: string;
		main: string;
	};
	background: CustomTypeBackground;
}

interface CustomTypeBackground {
	default: string;
	alt: string;
}

// add new palette colors here
declare module "@mui/material/styles" {
	interface Palettes extends CustomPalettes {}

	interface CustomTheme extends Theme {}
	interface CustomThemeOptions extends ThemeOptions {
		palette: Palettes;
	}

	export function createTheme(
		options: CustomThemeOptions
	): CustomTheme;
}
declare module "@mui/material/styles/createPalette" {
	interface Palettes extends CustomPalettes {}
	interface TypeBackground extends CustomTypeBackground {}
}

import {
	PaletteMode,
	Theme,
	ThemeOptions,
} from "@mui/material";

interface ITokens {
	[key: string]: Record<number, string>;
}

// color design tokens export
const tokensDark = {
	grey: {
		100: "#ffffff", // adjusted
		200: "#c2c2c2",
		300: "#a3a3a3",
		400: "#858585",
		500: "#666666",
		600: "#525252",
		700: "#3d3d3d",
		800: "#292929",
		900: "#141414",
		1000: "#000000", // adjusted
	},

	primary: {
		// blue
		100: "#d3d4de",
		200: "#a6a9be",
		300: "#7a7f9d",
		400: "#4d547d",
		500: "#21295c",
		600: "#191F45",
		700: "#141937",
		800: "#0d1025",
		900: "#070812",
	},

	secondary: {
		// yellow
		100: "#f0f0f0", // adjusted
		200: "#ffedc2",
		300: "#ffe3a3",
		400: "#ffda85",
		500: "#ffd166",
		600: "#cca752",
		700: "#997d3d",
		800: "#665429",
		900: "#332a14",
	},
};

function reverseTokens(tokensDark: ITokens) {
	const reversedTokens: ITokens = {} as ITokens;
	Object.entries(tokensDark).forEach(([key, val]) => {
		const keys: number[] = Object.keys(val).map(Number);
		const values = Object.values(val);
		const length = keys.length;
		const reversedObj: Record<number, string> =
			{} as Record<number, string>;
		for (let i = 0; i < length; i++) {
			reversedObj[keys[i]] = values[length - i - 1];
		}

		reversedTokens[key] = reversedObj;
	});
	return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode: string) => {
	return {
		palette: {
			mode: mode as PaletteMode,
			...(mode === "dark"
				? {
						// palette values for dark mode
						primary: {
							...tokensDark.primary,
							main: tokensDark.primary[400],
							light: tokensDark.primary[400],
						},
						secondary: {
							...tokensDark.secondary,
							main: tokensDark.secondary[300],
						},
						neutral: {
							...tokensDark.grey,
							main: tokensDark.grey[500],
						},
						background: {
							default: tokensDark.primary[600],
							alt: tokensDark.primary[500],
						},
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				: {
						// palette values for light mode
						primary: {
							...tokensLight.primary,
							main: tokensDark.grey[500],
							light: tokensDark.grey[100],
						},
						secondary: {
							...tokensLight.secondary,
							main: tokensDark.secondary[600],
							light: tokensDark.secondary[700],
						},
						neutral: {
							...tokensLight.grey,
							main: tokensDark.grey[500],
						},
						background: {
							default: tokensDark.grey[1000],
							alt: tokensDark.grey[500],
						},
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }),
		},
		typography: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};

export interface ThemeSettings {}
