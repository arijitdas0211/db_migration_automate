import { CheckCircle, Warning, TableChart, Timeline } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

export default function StatusCards({
  conStatus,
  dbName,
  currentRecordCount,
  activeTabName,
  totalRecords,
}) {
  const statusCards = [
    {
      title: "Connection Status",
      value: conStatus ? `Connected to ${dbName}` : "Not Connected",
      icon: conStatus ? <CheckCircle /> : <Warning />,
      color: conStatus ? "success" : "warning",
    },
    {
      title: "Current View",
      value: currentRecordCount.toLocaleString(),
      subtitle: `records in ${activeTabName}`,
      icon: <TableChart />,
      color: "primary",
    },
    {
      title: "Total Records",
      value: totalRecords.toLocaleString(),
      subtitle: "across all tables",
      icon: <Timeline />,
      color: "info",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3, display: "flex" }}>
      {statusCards.map((card, index) => (
        <Grid key={index} sx={{ width: "30%" }}>
          <Card elevation={3} sx={{ height: "100%", border: '0.5px solid #e9e9e9' }}>
            <CardContent sx={{ py: card.subtitle ? 3 : 4.3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${card.color}.light`,
                    color: "white",
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="medium">
                    {card.title}
                  </Typography>
                  <Typography
                    variant={card.subtitle ? "h5" : "body2"}
                    color={card.subtitle ? `${card.color}.main` : `${card.color}.main`}
                    fontWeight={card.subtitle ? "bold" : "medium"}
                  >
                    {card.value}
                  </Typography>
                  {card.subtitle && (
                    <Typography variant="caption" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


