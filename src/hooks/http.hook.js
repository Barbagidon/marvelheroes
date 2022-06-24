import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      setLoading(true);
      try {
        const result = await fetch(url, { method, body, headers });
        try {
          if (!result.ok) {
            throw new Error(`Could not fetch ${url}. Error: ${result.status}`);
          }
          const data = await result.json();
          return data;
        } catch (e) {}
      } catch (e) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },

    []
  );

  const сlearError = () => {
    useCallback(() => {
      setError(null);
    }, []);
  };

  return { loading, request, error, сlearError };
};
