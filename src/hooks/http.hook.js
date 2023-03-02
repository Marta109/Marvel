import {useCallback, useState} from "react";

export const useHttp = () => {
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {"Content-Type": "application/json"}
    ) => {
      setLoding(true);
      try {
        const respnse = await fetch(url, {
          method,
          body,
          headers,
        });
        if (!respnse.ok) {
          throw new Error(
            `Could not fetch ${url}, status: ${respnse.status}`
          );
        }
        const data = await respnse.json();
        setLoding(false);
        return data;
      } catch (error) {
        setLoding(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return {loading, error, request, clearError};
};
