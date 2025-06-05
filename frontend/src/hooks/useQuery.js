// Helper function to format field names to readable header names
function formatHeaderName(fieldKey) {
  return fieldKey
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to spaces
    .replace(/_/g, " ") // underscores to spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize first letter of each word
}

// Helper function to calculate column width
function calculateColumnWidth(numberOfColumns) {
  const remainingWidth = 95; // 100% - 5% for ID column
  const width = Math.max(Math.floor(remainingWidth / numberOfColumns), 15);
  return `${width}%`;
}

export function extractDataFromQuerySet(querySet) {
  const columns = {};
  const tabData = {};

  querySet.forEach((item) => {
    // Convert label to uppercase for key (e.g., "type_table" -> "TYPE_TABLE")
    const key = item.label.toUpperCase();

    // Auto-generate columns based on the actual data structure
    if (item.rows.length > 0) {
      const firstRow = item.rows[0];
      const rowKeys = Object.keys(firstRow);

      columns[key] = [
        { field: "id", headerName: "#", width: "5%" },
        ...rowKeys.map((fieldKey) => ({
          field: fieldKey,
          headerName: formatHeaderName(fieldKey),
          width: calculateColumnWidth(rowKeys.length),
        })),
      ];
    } else {
      // Default columns for empty data
      columns[key] = [
        { field: "id", headerName: "#", width: "10%" },
        { field: "message", headerName: "Message", width: "90%" },
      ];
    }

    // Extract tabData - add id to each row
    if (item.rows.length > 0) {
      tabData[key] = item.rows.map((row, index) => ({
        id: index + 1,
        ...row,
      }));
    } else {
      tabData[key] = [{ id: 1, message: "No data available" }];
    }
  });

  return { columns, tabData };
}
