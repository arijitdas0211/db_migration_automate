import React, { useContext } from "react";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import formattedHeader from "../components/FormattedName";

export default function DBObjectsSummary() {
  DataTable.use(DT);
  const { isConnected, queryData } = useContext(ValidateAssessContext); // Returns validateAssess, isConnected, queryData, error
  // console.log("isConnected:", isConnected);
  // console.log("queryData:", queryData);

  return (
    <>
      <div className="card material-card mb-4">
        <div className="card-header p-3 bg_primary">
          <h5 className="mb-0">
            <i className="fas fa-list-alt me-2" />
            Database Objects Summary
          </h5>
        </div>
        <div className="card-body">
          {isConnected ? (
            <div className="p-3">
              <DataTable className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type Desc</th>
                    <th scope="col">No. of Column Name</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(queryData) &&
                    queryData.map((data, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{formattedHeader(data.label)}</td>
                        <td>{data.rowCount}</td>
                      </tr>
                    ))}
                </tbody>
              </DataTable>
            </div>
          ) : (
            <div className="empty-state text-center py-5">
              {/* <i className="fa-solid fa-database empty-icon mb-3" /> */}
              <p className="text-muted mb-0">No summary data available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
