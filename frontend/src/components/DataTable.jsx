import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import sentenceCase from "../components/SentenceCase";

export default function DataTable({ data = [], columns = [], title = "" }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Error handling for invalid data
  if (!Array.isArray(data)) {
    return (
      <Alert severity="error">
        Invalid data format. Expected an array but received: {typeof data}
      </Alert>
    );
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <Alert severity="warning">
        No columns defined for the table.
      </Alert>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Render cell content with proper error handling
  const renderCellContent = (column, value, row) => {
    if (column.renderCell && typeof column.renderCell === "function") {
      try {
        return column.renderCell({ value, row });
      } catch (error) {
        console.error("Error rendering cell:", error);
        return <span style={{ color: "red" }}>Error</span>;
      }
    }

    if (value === null || value === undefined) {
      return <span style={{ color: "#999", fontStyle: "italic" }}>-</span>;
    }

    return value;
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Table Title */}
      {title && (
        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
          {sentenceCase(title)}
        </Typography>
      )}
      
      {/* Table Container */}
      <TableContainer component={Paper} sx={{ mb: 2, width: "100%" }}>
        <Table sx={{ minWidth: 650 }}>
          {/* Table Header */}
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    width: col.width || "auto",
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData.length === 0 ? (
              // No data row
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Data rows with red background if any cell value is "no"
              paginatedData.map((row, index) => {
                const hasNoValue = Object.values(row).some(
                  (val) => typeof val === "string" && val.toLowerCase() === "no"
                );

                return (
                  <TableRow
                    key={row.id || index}
                    sx={{ 
                      backgroundColor: hasNoValue ? "#ff7961" : "inherit"
                     }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        sx={{
                          width: col.width || "auto",
                          color: hasNoValue ? "#000000" : "inherit"
                        }}
                      >
                        {renderCellContent(col, row[col.field], row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Table Pagination */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
