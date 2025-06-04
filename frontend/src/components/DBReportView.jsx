import { CheckCircle, Download, Info, Warning, TableChart, Timeline } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Fade, Grid, Paper, Stack, Tab, Tabs, Typography, useTheme, alpha } from "@mui/material"; 
import DataTable from "./DataTable"; 
import titleCase from "../components/TitleCase";

export default function DBReportView({
  conStatus,
  conForm,
  tableData,
  currTabKey,
  exportFile,
  activeTab,
  setActiveTab,
  dbName,
  tabNames,
  tableCols,
}) {
  const theme = useTheme();
  const currentRecordCount = tableData[currTabKey]?.length || 0;
  const totalRecords = Object.values(tableData).reduce(
    (sum, data) => sum + (data?.length || 0),
    0
  );

  return (
    <Box
      sx={{
        p: 0,
        bgcolor: "grey.50",
        minHeight: "100vh",
        width: "100%",
        minWidth: "900px",
        mt: 1,
      }}
    >
      {/* Connection Alert */}
      {!conStatus && (
        <Fade in={!conStatus}>
          <Alert
            elevation={2}
            severity="info"
            icon={<Info />}
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "1rem",
              },
            }}
          >
            <Typography variant="body1" fontWeight="medium">
              Database Connection Required
            </Typography>
            <Typography variant="body2">
              Please establish a database connection to analyze and view
              Migration Report.
            </Typography>
          </Alert>
        </Fade>
      )}

      {/* Status and Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 3, display: "flex" }}>
        {/* Connection Status Card */}
        <Grid sx={{ width: "30% " }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent sx={{ py: 4.2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: conStatus ? "success.light" : "warning.light",
                    color: "white",
                  }}
                >
                  {conStatus ? <CheckCircle /> : <Warning />}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="medium">
                    Connection Status
                  </Typography>
                  <Typography
                    variant="body2"
                    color={conStatus ? "success.main" : "warning.main"}
                    fontWeight="medium"
                  >
                    {conStatus
                      ? `Connected to ${dbName}`
                      : "Not Connected"}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Tab Records */}
        <Grid sx={{ width: "30% " }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "primary.light",
                    color: "white",
                  }}
                >
                  <TableChart />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="medium">
                    Current View
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    {currentRecordCount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    records in {tabNames[activeTab]}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Records */}
        <Grid sx={{ width: "30% " }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "info.light",
                    color: "white",
                  }}
                >
                  <Timeline />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="medium">
                    Total Records
                  </Typography>
                  <Typography variant="h5" color="info.main" fontWeight="bold">
                    {totalRecords.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    across all tables
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Data Card */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardHeader
          title={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                Migration Analysis
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={exportFile}
                disabled={!conStatus || currentRecordCount === 0}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "medium",
                  px: 3,
                }}
              >
                Export CSV
              </Button>
            </Stack>
          }
          sx={{ pb: 1 }}
        />

        <Divider />

        <CardContent sx={{ p: 0 }}>
          {/* Enhanced Tabs */}
          {conStatus ? (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
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
                const recordCount =
                  tableData[Object.keys(tableData)[index]]?.length || 0;
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
          ) : ""}
          {/* Table Container */}
          <Box sx={{ p: 3 }}>
            {conStatus ? (
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <DataTable
                  data={tableData[currTabKey] || []}
                  columns={tableCols[currTabKey] || []}
                  title={`${tabNames[activeTab]} Dataset`}
                />
              </Paper>
            ) : (
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
                {/* <Database sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} /> */}
                <Typography variant="h6" gutterBottom>
                  No Data Available
                </Typography>
                <Typography variant="body2" textAlign="center">
                  Connect to your database to start viewing and analyzing your
                  data
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
