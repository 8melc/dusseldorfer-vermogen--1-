import { auth } from "app/auth";
import { API_URL } from "../constants";
import { Brain } from "./Brain";
import type { RequestParams } from "./http-client";

const constructBaseUrl = (): string => {
	if (API_URL) {
		return API_URL;
	}

	// Fallback: use current origin (works with Vite proxy in dev)
	return window.location.origin;
};

type BaseApiParams = Omit<RequestParams, "signal" | "baseUrl" | "cancelToken">;

const constructBaseApiParams = (): BaseApiParams => {
  return {
    credentials: "include",
    secure: true,
  };
};

const constructClient = () => {
  const baseUrl = constructBaseUrl();
  const baseApiParams = constructBaseApiParams();

  return new Brain({
    baseUrl,
    baseApiParams,
    customFetch: (url, options) => {
      // Remove duplicate /routes/routes if present
      const finalUrl = url.replace(/\/routes\/routes/g, "/routes");
      return fetch(finalUrl, options);
    },
    securityWorker: async () => {
      return {
        headers: {
          Authorization: "Bearer demo-token",
        },
      };
    },
  });
};

const brain = constructClient();

export default brain;
