import React from "react";

export default function LoaderOverlay() {
  return (
    <>
      {/* Loading Overlay */}
      <div className="loading-overlay" id="loadingOverlay">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-center">Connecting to database...</p>
        </div>
      </div>
    </>
  );
}
