import * as XLSX from "xlsx";

export function useExport() {
  const handleExportExcel = (tabData, columns, recordLimit = null) => {
    try {
      const workbook = XLSX.utils.book_new();

      Object.entries(tabData).forEach(([tabName, data]) => {
        const headers = columns[tabName]?.map((col) => col.headerName) || [];
        const fields = columns[tabName]?.map((col) => col.field) || [];

        const limitedData = recordLimit ? data.slice(0, recordLimit) : data;

        const sheetData = [
          headers,
          ...limitedData.map((row) =>
            fields.map((field) => (row[field] !== undefined ? row[field] : ""))
          ),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

        // Style: bold, colored headers + borders
        headers.forEach((_, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
          if (!worksheet[cellRef]) return;

          worksheet[cellRef].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } }, // Light blue background
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
            alignment: { horizontal: "center", vertical: "center" },
          };
        });

        // Apply column width
        worksheet["!cols"] = fields.map((field) => {
          const maxLength = Math.max(
            headers[fields.indexOf(field)]?.length || 10,
            ...limitedData.map((row) => String(row[field] || "").length)
          );
          return { wch: maxLength + 2 };
        });

        // Apply borders to all data cells
        for (let r = 1; r <= limitedData.length; r++) {
          for (let c = 0; c < fields.length; c++) {
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

      XLSX.writeFile(
        workbook,
        `Migration_Analysis_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      alert("Failed to export Excel. Please try again.");
    }
  };

  return { handleExportExcel };
}
