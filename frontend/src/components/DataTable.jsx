import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import sentenceCase from "../components/SentenceCase";

// Reusable Table Component
export default function DataTable({ data, columns, title }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>{sentenceCase(title)}</Typography>
      <TableContainer component={Paper} sx={{ mb: 2, width: '100%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              {columns.map((col) => (
                <TableCell 
                  key={col.field} 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    width: col.width || 'auto'
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell 
                    key={col.field}
                    sx={{ width: col.width || 'auto' }}
                  >
                    {col.renderCell ? col.renderCell({ value: row[col.field] }) : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
