import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export function useDatabase() {
  const [form, setForm] = useState({
    server: "",
    database: "",
    username: "",
    password: "",
    host: "localhost",
  });
  const [servers, setServers] = useState([]);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  // Fetch servers on mount
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/servers/activedb/`);
        setServers(response.data.data);
        setError("");
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || err.message || "Failed to fetch servers";
        setError(errorMessage);
        console.error("Error fetching servers:", errorMessage);
      }
    };

    fetchServers();
  }, []);

  const [queryData, setQueryData] = useState([]);

  const handleConnect = async () => {
    if (!form.server || !form.database || !form.username) {
      setError("Please fill in all required fields");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/servers/activedb/connection-and-assessment/`,
        {
          host: form.host,
          database: form.database,
          username: form.username,
          password: form.password,
          type: form.server,
        }
      );

      if (response.data.success) {
        setConnected(true);
        setQueryData(response.data.data);
        setError("");
      } else {
        const errorMsg = response.data.error || "Connection failed";
        setError(errorMsg);
        alert("Connection failed: " + errorMsg);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Connection failed";
      setError(errorMessage);
      alert("Connection failed: " + errorMessage);
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setForm({
      server: "",
      database: "",
      username: "",
      password: "",
      host: "localhost",
    });
    setError("");
  };

  return {
    form,
    setForm,
    servers,
    error,
    connected,
    handleConnect,
    handleDisconnect,
    queryData,
  };
}
