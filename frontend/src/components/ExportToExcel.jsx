import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(columns, rows, fileName = "data_export.xlsx") {
  const data = rows.map((row) => {
    const rowData = {};
    columns.forEach((col) => {
      const value = col.valueGetter ? col.valueGetter({ row }) : row[col.field];
      rowData[col.headerName] = value;
    });
    return rowData;
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, fileName);
}
