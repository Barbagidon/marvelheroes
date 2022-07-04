import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting");

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      setLoading(true);
      setProcess("loading");

      try {
        const result = await fetch(url, { method, body, headers });
        try {
          if (!result.ok) {
            throw new Error(`Could not fetch ${url}. Error: ${result.status}`);
          }
          const data = await result.json();
          setProcess("confirmed");

          return data;
        } catch (e) {}
      } catch (e) {
        setError(e.message);
        setProcess("error");
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
      setProcess("loading");
    }, []);
  };

  return { loading, request, error, сlearError, process, setProcess };
};
