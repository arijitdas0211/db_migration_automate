import React from "react";

export default function Header() {
  return (
    <>
      {/* Header */}
      <div className="header-container position-fixed">
        <div className="container-fluid">
          <div className="row align-items-center px-3 py-3">
            <div className="col-auto">
            <i className="fa-solid fa-database fs-3" style={{ color: "#ffffff" }} />
            </div>
            <div className="col">
              <h1 className="header-title mb-0">Database Migration</h1>
              <p className="header-subtitle mb-0">Console</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
