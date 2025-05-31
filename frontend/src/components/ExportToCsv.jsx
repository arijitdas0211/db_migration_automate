export function exportToCSV(columns, rows, fileName = "data_export.csv") {
  const header = columns.map((col) => col.headerName).join(",");
  const csvRows = rows.map((row) => {
    return columns
      .map((col) => {
        const value = col.valueGetter
          ? col.valueGetter({ row })
          : row[col.field];
        return `"${value !== undefined ? value : ""}"`;
      })
      .join(",");
  });
  const csvContent = [header, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
