import { Box, Container } from "@mui/material";
import ConnectionAlert from "./ConnectionAlert";
import StatusCards from "./StatusCards";
import MainDataCard from "./MainDataCard";
import { useState } from "react";
import { useExport } from "../hooks/useExport";
import { extractDataFromQuerySet } from "../hooks/useQuery";

export default function DBReportView({ conStatus, dbName, queryData }) {

  // From Home Comp transferred
  const { handleExportExcel } = useExport();
  const [activeTab, setActiveTab] = useState(0);

  const { columns, tabData } = extractDataFromQuerySet(queryData);

  const mockData = {
    columns: columns,
    tabData: tabData
  };
  
  const tableData = mockData.tabData; 

  const tabNames = Object.keys(mockData.columns);
  const tabKeys = Object.keys(mockData.tabData);
  const currentTabKey = tabKeys[activeTab];
  
  // From Home Comp transferred

  const currentRecordCount = tableData[currentTabKey]?.length > 1 ? tableData[currentTabKey]?.length : 0;
  const totalRecords = Object.values(tableData).reduce(
    (sum, data) => sum + (data?.length > 1 ? data?.length : 0),
    0
  );

  const handleExport = () => {
    handleExportExcel(mockData.tabData, mockData.columns, 10);
  };

  return (
    <Container maxWidth={false}>      
    
    <Box
      sx={{
        p: 0,
        bgcolor: "grey.50",
        minHeight: "100vh",
        width: 1,
        maxWidth: "60vw",
        mt: 1,
      }}
    >
      <ConnectionAlert isConnected={conStatus} />

      <StatusCards
        conStatus={conStatus}
        dbName={dbName}
        currentRecordCount={currentRecordCount}
        activeTabName={tabNames[activeTab]}
        totalRecords={totalRecords}
      />

      <MainDataCard
        conStatus={conStatus}
        currentRecordCount={currentRecordCount}
        tabNames={tabNames}
        tableData={mockData.tabData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currTabKey={currentTabKey}
        tableCols={mockData.columns}
        onExport={handleExport}
        queryData={queryData}
      />
    </Box>

    </Container>
  );
}


