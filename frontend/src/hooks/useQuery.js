// Helper function to format field names to readable header names
function formatHeaderName(fieldKey) {
  // Handle special cases or create a mapping for known fields
  const fieldMappings = {
    hasspecialcharsorlongname: "Has Special Chars Or Long Name",
    name: "Name",
    id: "ID",
    rowguid: "Row GUID",
    modifieddate: "Modified Date",
    createddate: "Created Date",
  };

  // Check if we have a predefined mapping
  const lowerKey = fieldKey.toLowerCase();
  if (fieldMappings[lowerKey]) {
    return fieldMappings[lowerKey];
  }

  // Default formatting for other fields
  return fieldKey
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to spaces
    .replace(/_/g, " ") // underscores to spaces
    .toLowerCase() // convert to lowercase first
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
    const rawKey = item.label;
    const formattedTabKey = formatHeaderName(rawKey);

    if (item.rows.length > 0) {
      const firstRow = item.rows[0];
      const rowKeys = Object.keys(firstRow);

      // Build formatted columns
      columns[formattedTabKey] = [
        { field: "id", headerName: "#", width: "5%" },
        ...rowKeys.map((rawFieldKey) => ({
          field: formatHeaderName(rawFieldKey),
          headerName: formatHeaderName(rawFieldKey),
          width: calculateColumnWidth(rowKeys.length),
        })),
      ];

      // Format both keys and string values
      tabData[formattedTabKey] = item.rows.map((rawRow, index) => {
        const formattedRow = { id: index + 1 };
        for (const key in rawRow) {
          const formattedKey = formatHeaderName(key);
          const value = rawRow[key];
          formattedRow[formattedKey] =
            typeof value === "string" ? formatHeaderName(value) : value;
        }
        return formattedRow;
      });
    } else {
      columns[formattedTabKey] = [
        { field: "id", headerName: "#", width: "10%" },
        { field: "Message", headerName: "Message", width: "90%" },
      ];
      tabData[formattedTabKey] = [{ id: 1, Message: "No Data Available" }];
    }
  });

  return { columns, tabData };
}
