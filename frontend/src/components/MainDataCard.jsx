import { Download } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import DataTabs from "./DataTabs";
import DataTableContainer from "./DataTableContainer";

export default function MainDataCard({
  conStatus,
  // currentRecordCount,
  tabNames,
  tableData,
  activeTab,
  setActiveTab,
  currTabKey,
  tableCols,
  onExport,
}) {
  return (
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
              onClick={onExport}
              disabled={!conStatus}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium",
                px: 3,
              }}
            >
              Export .xlsx
            </Button>
          </Stack>
        }
        sx={{ pb: 1 }}
      />

      <Divider />

      <CardContent sx={{ p: 0, overflowX: 'auto' }}>
        {conStatus && (
          <DataTabs
            tabNames={tabNames}
            tableData={tableData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        <DataTableContainer
          conStatus={conStatus}
          activeTab={activeTab}
          tabNames={tabNames}
          tableData={tableData}
          currTabKey={currTabKey}
          tableCols={tableCols}
        />
      </CardContent>
    </Card>
  );
}


