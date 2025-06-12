import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import notify from "./Notification";
import { ConnectionContext } from "../contexts/ServerData";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";

export default function Connection() {
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get-csrf-token/", {
      withCredentials: true,
    });
  }, []);

  const connectionState = useContext(ConnectionContext);
  const validateAssessState = useContext(ValidateAssessContext); // Returns validateAssess, isConnected, queryData, error

  const [form, setForm] = useState(() => {
    const savedForm = sessionStorage.getItem("form");
    return savedForm
      ? JSON.parse(savedForm)
      : {
          host: "localhost",
          type: "",
          database: "",
          username: "",
          password: "",
        };
  });

  useEffect(() => {
    const savedForm = sessionStorage.getItem("form");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  const [servers, setServers] = useState([]); // It takes array not normal value
  // Setting state for setting DB dynamically
  const [selectedServer, setSelectedServer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (connectionState.servers && connectionState.servers.length > 0) {
      const allServerTypes = connectionState.servers.flatMap((server) =>
        server.services ? server.services.map((service) => service.type) : []
      );
      setServers(allServerTypes);
    }
  }, [connectionState.servers]);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (form.type && form.database && form.username) {
      setConnecting(true);

      sessionStorage.setItem("form", JSON.stringify(form));
      await validateAssessState.validateAssess(form);

      // console.log(validateAssessState.queryData);
    } else {
      const msg = "Please fill all the fields";
      notify(msg, "error");
    }
  };

  useEffect(() => {
    if (connecting === true) {
      if (validateAssessState.isConnected) {
        notify("Connected to Database", "success");

        // console.log(validateAssessState.queryData);
      } else if (validateAssessState.error) {
        notify(`Connection failed: ${validateAssessState.error}`, "error");
      }
      setConnecting(false);
    }
  }, [
    connecting,
    validateAssessState.queryData,
    validateAssessState.error,
    validateAssessState.isConnected,
  ]);

  const handleDisconnect = (e) => {
    e.preventDefault();
    setForm({
      type: "",
      database: "",
      username: "",
      password: "",
      host: "localhost",
    });
    setSelectedServer("");
    validateAssessState.setIsConnected(false);
    document.cookie = "isConnected=; Max-Age=0; path=/";
    sessionStorage.removeItem("form");
    notify("Disconnected from Database", "success");
  };

  return (
    <>
      {/* Left Panel - Database Connection */}
      <ToastContainer />
      <div className="col-lg-4 col-xl-3">
        <div
          className="conn_card card material-card"
          style={{ backgroundColor: "#f5faff" }}
        >
          <div className="card-header p-3 shadow-sm">
            <div className="d-flex align-items-center">
              {/* <i className="fas fa-database text-primary me-2" /> */}
              <h5 className="mb-0">Database Connection</h5>
              <span
                className="badge badge-disconnected ms-auto"
                style={{
                  backgroundColor: validateAssessState.isConnected
                    ? "#00d232"
                    : "#fe9000",
                }}
              >
                <i className="fa-solid fa-circle-notch me-1" />
                {validateAssessState.isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
          <div className="card-body p-4">
            <form id="connectionForm">
              {/* Server Environment */}
              <div className="mb-4">
                {/* <label htmlFor="serverEnvironment" className="form-label">
                  DB Server
                </label> */}
                <div className="select-wrapper">
                  <select
                    className="form-select custom-select"
                    id="serverEnvironment"
                    onChange={(e) => {
                      setForm((prevForm) => {
                        const updatedForm = {
                          ...prevForm,
                          type: e.target.value,
                          database: "",
                        };
                        sessionStorage.setItem(
                          "form",
                          JSON.stringify(updatedForm)
                        );
                        setSelectedServer(updatedForm.type);
                        return updatedForm;
                      });
                    }}
                    value={form.type}
                    disabled={validateAssessState.isConnected}
                  >
                    <option value="">Select DB Server</option>
                    {servers &&
                      servers.map((server, i) => (
                        <option key={i} value={server}>
                          {server}
                        </option>
                      ))}
                  </select>
                  <i className="fas fa-server select-icon" />
                </div>
              </div>
              <div className="mb-4">
                {/* <label htmlFor="database" className="form-label">
                  Database
                </label> */}
                <div className="select-wrapper">
                  <select
                    className="form-select custom-select"
                    id="database"
                    onChange={(e) => {
                      const updatedForm = { ...form, database: e.target.value };
                      setForm(updatedForm);
                      sessionStorage.setItem(
                        "form",
                        JSON.stringify(updatedForm)
                      );
                    }}
                    value={form.database}
                    disabled={validateAssessState.isConnected}
                  >
                    <option value="">Select Database</option>
                    {selectedServer &&
                      connectionState.servers.flatMap((server) =>
                        server.services.flatMap((service) =>
                          selectedServer === service.type
                            ? service.databases.map((database, i) => (
                                <option key={i} value={database}>
                                  {database}
                                </option>
                              ))
                            : []
                        )
                      )}
                  </select>
                  <i className="fas fa-database select-icon" />
                </div>
              </div>

              {/* Username */}
              <div className="mb-4">
                {/* <label htmlFor="username" className="form-label">
                  Username
                </label> */}
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="username"
                    placeholder="Enter username"
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    value={form.username}
                    disabled={validateAssessState.isConnected}
                  />
                  <i className="fas fa-user input-icon" />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                {/* <label htmlFor="password" className="form-label">
                  Password
                </label> */}
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control custom-input"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    value={form.password}
                    disabled={validateAssessState.isConnected}
                  />
                  <i className="fas fa-lock input-icon" />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Connect Button */}
              {!validateAssessState.isConnected ? (
                <button
                  type="button"
                  className="btn btn-connect w-100 mb-3"
                  onClick={handleConnect}
                >
                  <i className="fa-solid fa-link me-2" />
                  Connect to Database
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-connect w-100 mb-3"
                  onClick={handleDisconnect}
                >
                  <i className="fa-solid fa-link-slash me-2" />
                  Disconnect
                </button>
              )}
            </form>

            {/* Connection Message */}
            <div className="alert alert-info mb-0 border-0" role="alert">
              <i className="fas fa-info-circle me-2" />
              All fields are required for connection
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
