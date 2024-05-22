import { useState, useEffect } from 'react';

export const useFetch = ({ url, method, headers, body }) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending((prevState) => true);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        setIsPending((prevState) => false);
        setData(json);
        setError((prevState) => null);
      } catch (error) {
        setError((prevState) => `${error} Could not Fetch Data `);
        setIsPending((prevState) => false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, error };
};
