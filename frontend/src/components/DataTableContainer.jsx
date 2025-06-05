import { Box, Paper } from "@mui/material";
import DataTable from "./DataTable";
import NoDataPlaceholder from "./NoDataPlaceholder";

// Extracted Data Table Container Component
export default function DataTableContainer({
  conStatus,
  activeTab,
  tabNames,
  tableData,
  currTabKey,
  tableCols,
}) {
  return (
    <Box sx={{ p: 3 }}>
      {conStatus ? (
        <Paper
          variant="outlined"
          sx={{
            border: 0,
            overflow: "hidden",
          }}
        >
          <DataTable
            data={tableData[currTabKey] || []}
            columns={tableCols[currTabKey] || []}
            title={`${tabNames[activeTab]} Dataset`}
          />
        </Paper>
      ) : (
        <NoDataPlaceholder />
      )}
    </Box>
  );
}

