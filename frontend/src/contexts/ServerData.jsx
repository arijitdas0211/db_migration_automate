import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// eslint-disable-next-line react-refresh/only-export-components
export const ConnectionContext = createContext(null);

export const ConnectionProvider = (props) => {
  const [servers, setServers] = useState(() => {
    const cached = sessionStorage.getItem("servers");
    return cached ? JSON.parse(cached) : [];
  });
  const [error, setError] = useState("");

  const fetchServers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servers/activedb/`);
      const data = response.data?.data || [];
      setServers(data);
      sessionStorage.setItem("servers", JSON.stringify(data));
      setError("");
    } catch (error) {
      const errorMsg = error.message || "Failed to fetch data -> servers";
      setError(errorMsg);
      console.log(`Error fetching servers: ${errorMsg}`);
    }
  };

  useEffect(() => {
    if (!servers || servers.length === 0) {
      fetchServers();
    }
  }, []);

  return (
    <ConnectionContext.Provider value={{ servers, error }}>
      {props.children}
    </ConnectionContext.Provider>
  );
};
