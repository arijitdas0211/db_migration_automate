import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// eslint-disable-next-line react-refresh/only-export-components
export const ValidateAssessContext = createContext(null);

export const ValidateAssessProvider = (props) => {
  const getCookie = (name) => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const csrfToken = getCookie("csrftoken");

  const getSessionData = () => {
    try {
      const raw = sessionStorage.getItem("queryData");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const [isConnected, setIsConnected] = useState(() => {
    return getCookie("isConnected") === "true";
  });

  const [error, setError] = useState("");
  const [queryData, setQueryData] = useState(getSessionData);

  const validateAssess = async (payloadForm) => {
    try {
      const payload = {
        host: payloadForm.host,
        type: payloadForm.type,
        database: payloadForm.database,
        username: payloadForm.username,
        password: payloadForm.password,
      };

      const response = await axios.post(
        `${API_BASE_URL}/servers/activedb/connection-and-assessment/`,
        payload,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response) {
        const data = response.data?.data || response.data;

        setIsConnected(true);
        document.cookie = "isConnected=true; path=/";
        setQueryData(data);
        sessionStorage.setItem("queryData", JSON.stringify(data));
        setError("");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        error.message ||
        "Failed to connect";

      setError(errorMsg);
      setIsConnected(false);
      sessionStorage.removeItem("queryData");
      document.cookie = "isConnected=false; path=/";
      console.error("Error fetching servers:", errorMsg);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      sessionStorage.removeItem("queryData");
    }
  }, [isConnected]);

  return (
    <ValidateAssessContext.Provider
      value={{ validateAssess, isConnected, setIsConnected, queryData, error }}
    >
      {props.children}
    </ValidateAssessContext.Provider>
  );
};
