import { Info } from "@mui/icons-material";
import { Alert, Fade, Typography } from "@mui/material";

export default function ConnectionAlert({ isConnected }) {
  if (isConnected) return null;

  return (
    <Fade in={!isConnected}>
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
          Please establish a database connection to analyze and view Migration Report.
        </Typography>
      </Alert>
    </Fade>
  );
}

