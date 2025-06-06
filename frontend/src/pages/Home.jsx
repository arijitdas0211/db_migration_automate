import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ConnectionForm from "../components/Connections";
import Appbar from "../components/Appbar";
import DBReportView from "../components/DBReportView";
import LogoutDialog from "../components/LogoutDialog";
import { useDatabase } from "../hooks/useDatabase";

export default function Home() {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { form, setForm, servers, error, connected, connecting, handleConnect, handleDisconnect, queryData } = useDatabase();

  const handleLogout = () => {
    setLogoutDialog(false);
    handleDisconnect();
  };

  return (
    <Box sx={{ minHeight: "80vh", bgcolor: "grey.50" }}>
      <Appbar
        conStatus={connected}
        setLogoutDialogFunc={setLogoutDialog}
        setLogoutDialogStatus={true}
      />

      <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Grid container spacing={3}>
          <Grid>
            <ConnectionForm
              form={form}
              setForm={setForm}
              connected={connected}
              connecting={connecting}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              servers={servers}
              error={error}
            />
          </Grid>

          <Grid>
            <DBReportView
              conStatus={connected}
              dbName={form.database}
              queryData={queryData}
            />
          </Grid>
        </Grid>
      </Container>

      <LogoutDialog
        open={logoutDialog && connected}
        onClose={() => setLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </Box>
  );
}

