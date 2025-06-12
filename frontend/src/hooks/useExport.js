import * as XLSX from "xlsx";
import formattedHeader from "../components/FormattedName";

export default function useExport() {
  const handleExportExcel = (queryData, recordLimit = null) => {
    try {
      const workbook = XLSX.utils.book_new();

      queryData.forEach((section) => {
        const tabName = section.label || "Sheet";
        const rows = section.rows || [];

        // Even if there are no rows, create headers from available metadata or leave it empty
        let headers = rows.length ? Object.keys(rows[0]) : [];
        let limitedData = recordLimit ? rows.slice(0, recordLimit) : rows;

        // Apply formatting to headers
        const formattedHeaders = headers.map((key) => formattedHeader(key));

        // Apply formatting to row values
        const formattedRows = limitedData.map((row) =>
          headers.map((key) =>
            row[key] !== undefined ? formattedHeader(row[key]) : ""
          )
        );

        // Ensure headers are always included (even if no data)
        const sheetData = [formattedHeaders, ...formattedRows];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

        // Style headers
        formattedHeaders.forEach((_, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
          if (!worksheet[cellRef]) return;

          worksheet[cellRef].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
            alignment: { horizontal: "center", vertical: "center" },
          };
        });

        // Column width auto fit
        worksheet["!cols"] = headers.map((key) => {
          const maxLength = Math.max(
            formattedHeader(key).length,
            ...limitedData.map(
              (row) => String(formattedHeader(row[key] || "")).length
            )
          );
          return { wch: maxLength + 2 };
        });

        // Style all data cells (if any)
        for (let r = 1; r < sheetData.length; r++) {
          for (let c = 0; c < headers.length; c++) {
            const cellRef = XLSX.utils.encode_cell({ r, c });
            if (!worksheet[cellRef]) continue;

            worksheet[cellRef].s = {
              border: {
                top: { style: "thin", color: { rgb: "AAAAAA" } },
                bottom: { style: "thin", color: { rgb: "AAAAAA" } },
                left: { style: "thin", color: { rgb: "AAAAAA" } },
                right: { style: "thin", color: { rgb: "AAAAAA" } },
              },
              alignment: { horizontal: "left", vertical: "center" },
            };
          }
        }

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          tabName.toUpperCase()
        );
      });

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      XLSX.writeFile(workbook, `Migration_Analysis_${timestamp}.xlsx`);
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      alert("Failed to export Excel. Please try again.");
    }
  };

  return { handleExportExcel };
}
