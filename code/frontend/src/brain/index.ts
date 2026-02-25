import { auth } from "app/auth";
import { API_HOST, API_PATH, API_PREFIX_PATH, DATABUTTON_API_PREFIX } from "../constants";
import { Brain } from "./Brain";
import type { RequestParams } from "./http-client";

const isDeployedToCustomApiPath = API_PREFIX_PATH !== API_PATH;

const constructBaseUrl = (): string => {
	// If Databutton API Prefix is set, use it directly
	if (DATABUTTON_API_PREFIX) {
		return DATABUTTON_API_PREFIX;
	}

	// If API_HOST is set, use it directly (e.g., Databutton API URL)
	if (API_HOST) {
		return `https://${API_HOST}${API_PATH}`;
	}

	if (isDeployedToCustomApiPath) {
		// Access via origin domain where webapp was hosted with given api prefix path
		const domain = window.location.origin || `https://${API_HOST}`;
		// For local development, use origin without prefix (Vite proxy handles /routes)
		// For production, use the prefix path
		if (domain.includes("localhost") || domain.includes("127.0.0.1")) {
			return domain;
		}
		return `${domain}${API_PREFIX_PATH}`;
	}

	// Access at configured proxy domain
	return `https://${API_HOST}${API_PATH}`;
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
      // If using Databutton API Prefix, the baseUrl already contains the full path
      if (DATABUTTON_API_PREFIX) {
        // The baseUrl is already the full Databutton API prefix (e.g., https://api.databutton.com/.../routes)
        // The url parameter contains the full path including /routes prefix
        // We need to remove the duplicate /routes if baseUrl already ends with /routes
        let finalUrl = url;
        
        // If baseUrl ends with /routes and url starts with /routes, remove one
        if (DATABUTTON_API_PREFIX.endsWith('/routes') && url.startsWith('/routes')) {
          // Remove the leading /routes from the path
          finalUrl = url.replace(/^\/routes/, '');
          // Construct full URL: baseUrl (ends with /routes) + path (without /routes)
          finalUrl = `${DATABUTTON_API_PREFIX}${finalUrl}`;
        } else {
          // If baseUrl doesn't end with /routes, just append the path
          finalUrl = `${DATABUTTON_API_PREFIX}${url.startsWith('/') ? url : `/${url}`}`;
        }
        
        console.log("[Brain] Using Databutton API Prefix:", DATABUTTON_API_PREFIX);
        console.log("[Brain] Original URL:", url);
        console.log("[Brain] Final URL:", finalUrl);
        
        // Ensure proper headers for Databutton API
        const headers = {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        };
        
        // Add Authorization header if available
        if (options?.headers && 'Authorization' in options.headers) {
          headers['Authorization'] = options.headers['Authorization'] as string;
        }
        
        return fetch(finalUrl, {
          ...options,
          headers,
        });
      }
      
      // If using external API (e.g., Databutton), remove duplicate /routes
      // because the baseUrl already contains /routes and path also starts with /routes
      if (API_HOST) {
        // Debug: Log the URL
        console.log("[Brain] Original URL:", url);
        
        // Replace /routes/routes with /routes to avoid duplicate
        let finalUrl = url.replace(/\/routes\/routes/g, "/routes");
        
        // Also handle cases where baseUrl ends with /routes and path starts with /routes
        // e.g., .../routes/routes/api/... -> .../routes/api/...
        finalUrl = finalUrl.replace(/(\/routes)\/routes(\/)/g, "$1$2");
        
        console.log("[Brain] Final URL:", finalUrl);
        return fetch(finalUrl, options);
      }

      if (isDeployedToCustomApiPath) {
        // For local development, the baseUrl is just the origin (no /routes)
        // and the path already contains /routes, so we use it as-is
        // For production, remove /routes/ segment from path if needed
        const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
        if (!isLocal) {
          // Remove /routes/ segment from path for production deployments
          const cleanedUrl = url.replace(API_PREFIX_PATH + "/routes", API_PREFIX_PATH);
          const finalUrl = cleanedUrl.replace(/\/routes\/routes/g, "/routes");
          return fetch(finalUrl, options);
        }
      }

      return fetch(url, options);
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
