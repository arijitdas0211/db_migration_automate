import { Box, Chip, Stack, Tab, Tabs, Typography, alpha, useTheme } from "@mui/material";
import titleCase from "../components/TitleCase";

export default function DataTabs({ tabNames, tableData, activeTab, setActiveTab }) {
  const theme = useTheme();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "0.5rem",
            fontWeight: "medium",
            minHeight: 64,
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.04),
            },
          },
          "& .Mui-selected": {
            fontWeight: "bold",
          },
        }}
      >
        {tabNames.map((name, index) => {
          const recordCount = tableData[Object.keys(tableData)[index]]?.length || 0;
          return (
            <Tab
              key={index}
              label={
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="body1" fontWeight="inherit">
                    {titleCase(name)}
                  </Typography>
                  <Chip
                    label={recordCount.toLocaleString()}
                    size="small"
                    color={index === activeTab ? "primary" : "default"}
                    sx={{ height: 20, fontSize: "0.75rem" }}
                  />
                </Stack>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
}