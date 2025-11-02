import { useState } from "react";
import axios from "./axios";

axios.defaults.baseURL = "https://moviesapi.ir/api/v1";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Something went wrong while fetching data. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};

export default useAxios;
