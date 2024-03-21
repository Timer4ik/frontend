import { getErrorData } from "./base";

export default function useFetcher() {
  const token = useCookie("accessToken").value;
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_URL;

  const initialParams = {
    baseURL: baseUrl,
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
    },
  };

  if (token && token !== "") {
    initialParams.headers.Authorization = `Bearer ${token}`;
  }

  const apiFetch = $fetch.create(initialParams);

  return {
    get: async (url, params = {}, headers = {}) => {
      let opts = {
        method: "GET",
        params,
        headers: { ...initialParams?.headers, ...headers },
      };

      return await apiFetch(url, opts)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return getErrorData(error)?.popup();
        });
    },
    post: async (url, body, config = {}) => {
      const headers = {
        ...initialParams?.headers,
        ...config?.headers,
      };

      const conf = {
        ...config,
        headers,
      };

      return await apiFetch(url, { method: "POST", body, ...conf })
        .then(async (res) => {
          if (res instanceof Blob) {
            return JSON.parse(await res.text());
          }
          return res;
        })
    },
    patch: async (url, body, config = {}) => {
      return await apiFetch(url, { method: "PATCH", body, ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let res = getErrorData(error);
          res?.popup();
          return res;
        });
    },
    put: async (url, body, config = {}) => {
      return await apiFetch(url, { method: "PUT", body, ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let res = getErrorData(error);
          res?.popup();
          return res;
        });
    },
    delete: async (url, config = {}) => {
      return await apiFetch(url, { method: "DELETE", ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return getErrorData(error);
        });
    },
  };
}
