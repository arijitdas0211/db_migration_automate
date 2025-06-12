import { useContext } from "react";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";
import StatusCards from "./StatusCards";
import DBObjectsSummary from "./DBObjectsSummary";
import MigrationAnalysis from "./MigrationAnalysis";

export default function MainContainer() {
  const validateAssessState = useContext(ValidateAssessContext); // Returns validateAssess, isConnected, queryData, error

  return (
    <>
      {/* Right Panel - Dashboard */}
      <div className="col-lg-8 col-xl-9">
        <div className="main_contend">
          {!validateAssessState.isConnected ? (
            // Top Alert
            <div className="alert alert-info material-alert mb-4" role="alert">
              <i className="fas fa-info-circle me-2" />
              <strong>Database Connection Required</strong>
              <br />
              Please establish a database connection to analyze and view
              Migration Report.
            </div>
          ) : (
            ""
          )}

          {/* Status Cards Row */}
          <StatusCards />

          {/* Database Objects Summary */}
          <DBObjectsSummary />

          {/* Migration Analysis */}
          <MigrationAnalysis />
        </div>
      </div>
    </>
  );
}
