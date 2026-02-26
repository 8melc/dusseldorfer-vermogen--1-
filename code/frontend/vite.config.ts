import react from "@vitejs/plugin-react";
import "dotenv/config";
import path from "node:path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import injectHTML from "vite-plugin-html-inject";
import tsConfigPaths from "vite-tsconfig-paths";

type Extension = {
	name: string;
	version: string;
	config: Record<string, unknown>;
};

enum ExtensionName {
	FIREBASE_AUTH = "firebase-auth",
	STACK_AUTH = "stack-auth"
}

const listExtensions = (): Extension[] => {
	if (process.env.DATABUTTON_EXTENSIONS) {
		try {
			return JSON.parse(process.env.DATABUTTON_EXTENSIONS) as Extension[];
		} catch (err: unknown) {
			console.error("Error parsing DATABUTTON_EXTENSIONS", err);
			console.error(process.env.DATABUTTON_EXTENSIONS);
			return [];
		}
	}

	return [];
};

const extensions = listExtensions();

const getExtensionConfig = (name: string): string => {
	const extension = extensions.find((it) => it.name === name);

	if (!extension) {
		console.warn(`Extension ${name} not found`);
	}

	return JSON.stringify(extension?.config);
};

const buildVariables = () => {
	const appId = process.env.VITE_APP_ID || "koelner-vermoegen";

	const apiUrl = process.env.VITE_API_URL || (process.env.NODE_ENV === "production" ? "" : "http://localhost:8000");
	const wsApiUrl = process.env.VITE_WS_API_URL || (apiUrl ? apiUrl.replace(/^http/, "ws") : "");

	const apiHost = process.env.VITE_API_HOST || "";
	const apiPath = process.env.VITE_API_PATH || "";
	const apiPrefixPath = process.env.VITE_API_PREFIX_PATH || "";

	const defines: Record<string, string> = {
		__APP_ID__: JSON.stringify(appId),
		__API_PATH__: JSON.stringify(apiPath),
		__API_HOST__: JSON.stringify(apiHost),
		__API_PREFIX_PATH__: JSON.stringify(apiPrefixPath),
		__API_URL__: JSON.stringify(apiUrl),
		__WS_API_URL__: JSON.stringify(wsApiUrl),
		__APP_BASE_PATH__: JSON.stringify(process.env.VITE_APP_BASE_PATH || "/"),
		__APP_TITLE__: JSON.stringify(process.env.VITE_APP_TITLE || "Kölner Vermögen"),
		__APP_FAVICON_LIGHT__: JSON.stringify(process.env.VITE_APP_FAVICON_LIGHT || "/favicon-light.svg"),
		__APP_FAVICON_DARK__: JSON.stringify(process.env.VITE_APP_FAVICON_DARK || "/favicon-dark.svg"),
		__APP_DEPLOY_USERNAME__: JSON.stringify(process.env.VITE_APP_DEPLOY_USERNAME || ""),
		__APP_DEPLOY_APPNAME__: JSON.stringify(process.env.VITE_APP_DEPLOY_APPNAME || ""),
		__APP_DEPLOY_CUSTOM_DOMAIN__: JSON.stringify(process.env.VITE_APP_DEPLOY_CUSTOM_DOMAIN || ""),
		__STACK_AUTH_CONFIG__: JSON.stringify(getExtensionConfig(ExtensionName.STACK_AUTH)),
		__FIREBASE_CONFIG__: JSON.stringify(
			getExtensionConfig(ExtensionName.FIREBASE_AUTH),
		),
	};

	return defines;
};

// https://vite.dev/config/
export default defineConfig({
	define: buildVariables(),
	plugins: [react(), splitVendorChunkPlugin(), tsConfigPaths(), injectHTML()],
	server: {
		proxy: {
			"/routes": {
				target: "http://127.0.0.1:8000",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
				},
			},
		},
	},
});
