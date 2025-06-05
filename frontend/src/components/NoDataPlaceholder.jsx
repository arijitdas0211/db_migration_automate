import { Box, Typography } from "@mui/material";

// Extracted No Data Placeholder Component
export default function NoDataPlaceholder() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        color: "text.secondary",
      }}
    >
      <Typography variant="h6" gutterBottom>
        No Data Available
      </Typography>
      <Typography variant="body2" textAlign="center">
        Connect to your database to start viewing and analyzing your data
      </Typography>
    </Box>
  );
}

