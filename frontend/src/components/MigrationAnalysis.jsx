import React, { useContext, useEffect, useRef, useState } from "react";
import { ValidateAssessContext } from "../contexts/ValidateAssessment";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import formattedHeader from "../components/FormattedName";
import useExport from "../hooks/useExport";

export default function MigrationAnalysis() {
  DataTable.use(DT);
  const { isConnected, queryData } = useContext(ValidateAssessContext);
  const { handleExportExcel } = useExport();

  // Tab Scroll controls
  const tabContainerRef = useRef(null);
  const scrollLeftRef = useRef(null);
  const scrollRightRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollAmount = 200;

  const handleScrollLeft = () => {
    tabContainerRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    tabContainerRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = tabContainerRef.current;

    const updateButtonState = () => {
      if (!container) return;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    };

    container?.addEventListener('scroll', updateButtonState);
    updateButtonState(); // Initial check

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleScrollLeft();
      if (e.key === 'ArrowRight') handleScrollRight();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container?.removeEventListener('scroll', updateButtonState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          {/* Header Section */}
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4">
            <div className="d-flex align-items-center mb-3 mb-lg-0">
              <div className="bg-primary rounded-circle p-3 me-3 shadow-sm">
                <i className="fas fa-exchange-alt text-white fs-5"></i>
              </div>
              <div>
                <h4 className="mb-1 fw-semibold text-dark">Migration Analysis</h4>
                <div className="text-muted small">
                  <i className={`fas fa-circle ${isConnected ? 'text-success' : 'text-danger'} me-2`} style={{fontSize: '8px'}}></i>
                  {isConnected ? 'Connected' : 'Disconnected'} • {Array.isArray(queryData) ? queryData.length : 0} datasets available
                </div>
              </div>
            </div>
            
            <button
              className={`btn btn-connect export_btn ${!isConnected ? 'disabled' : ''}`}
              disabled={!isConnected}
              onClick={() => handleExportExcel(queryData, 10)}
            >
              <i className="fas fa-download me-2"></i>
              Export .xlsx
            </button>
          </div>

          {/* Main Content */}
          <div className="card shadow-sm border-0">
            {isConnected ? (
              Array.isArray(queryData) && queryData.length > 0 ? (
                <>
                  {/* Scrollable Navigation Tabs */}
                  <div className="card-header bg-light border-bottom p-0">
                    <div className="position-relative">
                      <div className="d-flex align-items-center">
                        <button 
                          ref={scrollLeftRef}
                          className={`btn angle_nav_btn border-0 px-2 py-3 flex-shrink-0`} 
                          title="Scroll Left"
                          disabled={!canScrollLeft}
                          onClick={handleScrollLeft}
                        >
                          <i className="fas fa-angle-left text-primary"></i>
                        </button>
                        
                        <div ref={tabContainerRef}
                          className="overflow-auto flex-grow-1" 
                          style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                          }}
                          onScroll={() => {
                            if (tabContainerRef.current) {
                              setCanScrollLeft(tabContainerRef.current.scrollLeft > 0);
                              setCanScrollRight(tabContainerRef.current.scrollLeft + tabContainerRef.current.clientWidth < tabContainerRef.current.scrollWidth);
                            }
                          }}
                        >
                          <style>
                            {`
                              #tabContainer::-webkit-scrollbar {
                                display: none;
                              }
                            `}
                          </style>
                          <ul className="nav nav-tabs border-0 flex-nowrap" id="migrationTabs" role="tablist">
                            {queryData.map((data, index) => (
                              <li key={index} className="nav-item flex-shrink-0" role="presentation">
                                <button
                                  className={`nav-link fw-medium px-4 py-3 text-nowrap ${index === 0 ? 'active' : ''}`}
                                  id={`tab-${index}`}
                                  data-bs-toggle="tab"
                                  data-bs-target={`#content-${index}`}
                                  type="button"
                                  role="tab"
                                  aria-controls={`content-${index}`}
                                  aria-selected={index === 0}
                                  style={{
                                    minWidth: '180px',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  <i className="fas fa-table me-2"></i>
                                  {formattedHeader(data.label)}
                                  <span className="badge bg-primary ms-2">{data.rows ? data.rows.length : 0}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <button 
                          ref={scrollRightRef}
                          className={`btn angle_nav_btn border-0 px-2 py-3 flex-shrink-0`} 
                          title="Scroll Right"
                          disabled={!canScrollRight}
                          onClick={handleScrollRight}
                        >
                          <i className="fas fa-angle-right text-primary"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="card-body p-0">
                    <div className="tab-content" id="migrationTabContent">
                      {queryData.map((data, index) => (
                        <div
                          key={index}
                          className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                          id={`content-${index}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${index}`}
                        >
                          <div className="p-4">
                            {/* Statistics Row */}
                            <div className="row g-3 mb-4">
                              <div className="col-6 col-lg-3">
                                <div className="card bg-danger bg-opacity-10 border-danger border-opacity-25 h-100">
                                  <div className="card-body text-center py-3">
                                    <div className="fs-4 fw-bold text-danger mb-1">
                                      {queryData.reduce((acc, data) => acc + data.rowCount, 0)}
                                    </div>
                                    <div className="small text-muted">Total Table Records</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-lg-3">
                                <div className="card bg-success bg-opacity-10 border-success border-opacity-25 h-100">
                                  <div className="card-body text-center py-3">
                                    <div className="fs-4 fw-bold text-success mb-1">
                                      {data.rows ? data.rows.filter(row => 
                                        !Object.values(row).some(value => 
                                          typeof value === 'string' && value.toLowerCase().valueOf() === 'no'
                                        )
                                      ).length : 0}
                                    </div>
                                    <div className="small text-muted">Valid Records</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-lg-3">
                                <div className="card bg-warning bg-opacity-10 border-warning border-opacity-25 h-100">
                                  <div className="card-body text-center py-3">
                                    <div className="fs-4 fw-bold text-warning mb-1">
                                      {data.rows ? data.rows.filter(row => 
                                        Object.values(row).some(value => 
                                          typeof value === 'string' && value.toLowerCase().valueOf() === 'no'
                                        )
                                      ).length : 0}
                                    </div>
                                    <div className="small text-muted">Issues Found</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-lg-3">
                                <div className="card bg-primary bg-opacity-10 border-primary border-opacity-25 h-100">
                                  <div className="card-body text-center py-3">
                                    <div className="fs-4 fw-bold text-primary mb-1">
                                      {data.rows ? data.rows.length : 0}
                                    </div>
                                    <div className="small text-muted">Records</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Data Table Container */}
                            <div className="card border">                              
                              <div>
                                <DataTable className="table table-responsive table-hover table-striped mb-0">
                                  <thead className="table-primary sticky-top">
                                    <tr>
                                      {data.rows && data.rows.length > 0 && (
                                        <>
                                          <th scope="col" className="text-center" style={{minWidth: '60px'}}>
                                            <i className="fas fa-hashtag"></i>
                                          </th>
                                          {Object.keys(data.rows[0]).map((key, idx) => (
                                            <th key={idx} scope="col" className="text-nowrap fw-semibold" style={{minWidth: '150px'}}>
                                              <i className="fas fa-sort me-2 opacity-50"></i>
                                              {formattedHeader(key)}
                                            </th>
                                          ))}
                                        </>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.rows && data.rows.map((row, rowIndex) => {
                                      const hasIssue = Object.values(row).some(value => 
                                        typeof value === 'string' && value.toLowerCase().valueOf() === 'no'
                                      );
                                      
                                      return (
                                        <tr key={rowIndex} className={hasIssue ? 'table-danger' : ''}>
                                          <td className="text-center align-middle fw-medium">
                                            <span className={`badge ${hasIssue ? 'bg-danger' : 'bg-secondary'}`}>
                                              {rowIndex + 1}
                                            </span>
                                          </td>
                                          {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex} className="align-middle text-wrap text-break" style={{ maxWidth: "200px" }}>
                                              <div className="d-flex align-items-center">
                                                {typeof value === 'string' && value.toLowerCase().valueOf() === 'no' && (
                                                  <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                                                )}
                                                <span className={typeof value === 'string' && value.toLowerCase().valueOf() === 'no' ? 'fw-semibold' : ''}>
                                                  {formattedHeader(value)}
                                                </span>
                                              </div>
                                            </td>
                                          ))}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </DataTable>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // No Data State
                <div className="card-body text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-database text-muted opacity-50" style={{fontSize: '4rem'}}></i>
                  </div>
                  <h5 className="text-muted mb-3">No Migration Data Available</h5>
                  <p className="text-muted mb-4">
                    Migration analysis data will be displayed here once the connection is established and data is loaded.
                  </p>
                </div>
              )
            ) : (
              // Disconnected State
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  {/* <i className="fas fa-unlink text-muted opacity-50" style={{fontSize: '4rem'}}></i> */}
                </div>
                <h5 className="text-muted mb-3">Connection Required</h5>
                <p className="text-muted mb-4">
                  Please establish a database connection to view migration analysis data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}