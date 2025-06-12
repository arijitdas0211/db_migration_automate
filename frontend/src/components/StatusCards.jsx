import React, { useContext } from "react";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";

export default function StatusCards() {
  const { isConnected, queryData } = useContext(ValidateAssessContext);
  const totalCount = queryData.reduce((acc, data) => acc + data.rowCount, 0);

  return (
    <>
      <div className="row g-4 mb-4">
        {/* Connection Status */}
        <div className="col-md-4">
          <div className="card material-card status-card">
            <div className="card-body text-center">
              <div className={`status-icon ${isConnected ? 'status-success' : 'status-warning' } mb-3`}>
                {isConnected ?
                  (<i className="fa-regular fa-circle-check" />)
                :
                  (<i className="fa-solid fa-triangle-exclamation" />)
                }
              </div>
              <h6 className="card-subtitle mb-2">Connection Status</h6>
              <h5 className={`card-title ${isConnected ? 'text-success' : 'text-danger' } mb-0`}>{isConnected ? "Connected" : "Not Connected"}</h5>
              <small className="text-muted">&nbsp;</small>
            </div>
          </div>
        </div>

        {/* Current View */}
        <div className="col-md-4">
          <div className="card material-card status-card">
            <div className="card-body text-center">
              <div className="status-icon status-primary mb-3">
                <i className="fas fa-chart-bar" />
              </div>
              <h6 className="card-subtitle mb-2">Current View</h6>
              <h5 className="card-title text-primary mb-0">0</h5>
              <small className="text-muted">records in undefined</small>
            </div>
          </div>
        </div>

        {/* Total Records */}
        <div className="col-md-4">
          <div className="card material-card status-card">
            <div className="card-body text-center">
              <div className="status-icon status-primary mb-3">
                <i className="fas fa-chart-line" />
              </div>
              <h6 className="card-subtitle mb-2">Total Records</h6>
              <h5 className="card-title text-danger mb-0">{isConnected ? totalCount : 0}</h5>
              <small className="text-muted">across all tables</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
