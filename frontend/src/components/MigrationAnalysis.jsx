import React, { useContext } from "react";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import formattedHeader from "../components/FormattedName";
import useExport from "../hooks/useExport";

export default function MigrationAnalysis() {
  DataTable.use(DT);
  const { isConnected, queryData } = useContext(ValidateAssessContext); // Returns validateAssess, isConnected, queryData, error
  // console.log("isConnected:", isConnected);
  // console.log("queryData:", queryData);
  const { handleExportExcel } = useExport();

  return (
    <>
      <div className="card material-card">
        <div className="card-header p-3 bg_primary d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-exchange-alt me-2" />
            Migration Analysis
          </h5>
          <button
            className="btn export_btn btn-connect btn-sm"
            disabled={!isConnected ? true : false}
            onClick={() => handleExportExcel(queryData, 10)}   // handleExportExcel(queryData, recordLimit = 10)
          >
            <i className="fas fa-download me-2" />
            Export .xlsx
          </button>
        </div>
        <div className="card-body">

          {isConnected ? (
            Array.isArray(queryData) && (
              <>
                <nav>
                  <div className="nav nav-tabs active" id="nav-tab" role="tablist">
                    {queryData.map((data, i) => (
                      <button
                        key={i}
                        className={`nav-link fw-medium ${i === 0 ? "active" : ""}`}
                        id={`nav-${data.label}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#nav-${data.label}`}
                        type="button"
                        role="tab"
                        aria-controls={`nav-${data.label}`}
                        aria-selected={i === 0 ? "true" : "false"}
                      >
                        {formattedHeader(data.label)}
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  {queryData.map((data, i) => (
                    <div
                      key={i}
                      className={`tab-pane ${i === 0 ? "show active" : ""}`}
                      id={`nav-${data.label}`}
                      role="tabpanel"
                      aria-labelledby={`nav-${data.label}-tab`}
                      tabIndex={0}
                    >
                      <div className="p-3">
                        <DataTable className="table table-striped table-hover table-responsive">
                          <thead className="table-primary">
                            <tr>
                              {data.rows.length > 0 && (
                                <>
                                  <th scope="col">#</th>
                                  {Object.keys(data.rows[0]).map((key, idx) => (
                                    <th key={idx} scope="col">{formattedHeader(key)}</th>
                                  ))}
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {data.rows.map((row, rowIndex) => {
                              const hasNo = Object.values(row).includes("no");
                              return (
                                <tr key={rowIndex}>
                                  <th scope="row" style={hasNo ? { backgroundColor: "rgb(237 20 61 / 86%)", color: "white" } : {}}>
                                    {rowIndex + 1}
                                  </th>
                                  {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex} style={hasNo ? { backgroundColor: "rgb(237 20 61 / 86%)", color: "white" } : {}}>
                                      {formattedHeader(value)}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </DataTable>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <div className="empty-state text-center py-5">
              <p className="text-muted mb-0">No Migration Analysis data available</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
