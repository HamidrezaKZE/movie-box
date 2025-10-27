import { useEffect, useState } from "react";
import axios from "./axios";

axios.defaults.baseURL = "https://moviesapi.ir/api/v1";
const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.request(axiosParams);
      setResponse(result.data);

      //   setMoviesItems(response.data.data);
      //   setMetadata(response.data.metadata);
    } catch (error) {
      setError(error);
      console.error("Error fetching movies:", error);
    } finally {
      console.log("🚀 ~ useAxios ~ response:", response);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { response, error, loading };
};

export default useAxios;