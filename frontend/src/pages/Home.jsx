import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, IconButton, InputAdornment, Chip, AppBar, Toolbar, Container, Alert, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from "@mui/material"; 
import { DataGrid } from "@mui/x-data-grid"; 
import { Visibility, VisibilityOff, Download, Storage, Assessment, ExitToApp, Person, Lock, CheckCircle, Warning, Info } from "@mui/icons-material";
import Circle from "../components/Circle";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const [connectionForm, setConnectionForm] = useState({
    server: "",
    database: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [assessmentRunning, setAssessmentRunning] = useState(false);
  const [lastAssessment, setLastAssessment] = useState(null);
  const [logoutDialog, setLogoutDialog] = useState(false);

  // Sample data
  const tableData = [
    { id: 1, firstName: "John", lastName: "Smith", age: 35, department: "Engineering", status: "Active" },
    { id: 2, firstName: "Sarah", lastName: "Johnson", age: 42, department: "Marketing", status: "Active" },
    { id: 3, firstName: "Michael", lastName: "Brown", age: 28, department: "Sales", status: "Inactive" },
    { id: 4, firstName: "Emily", lastName: "Davis", age: 31, department: "HR", status: "Active" },
    { id: 5, firstName: "Robert", lastName: "Wilson", age: 45, department: "Finance", status: "Active" },
    { id: 6, firstName: "Sarah", lastName: "Johnson", age: 50, department: "Marketing", status: "Inactive" },
    { id: 7, firstName: "Emily", lastName: "Davis", age: 28, department: "HR", status: "Active" }
  ];

  const columns = [
    { field: "id", headerName: "#", flex: 0.5 },
    { field: "firstName", headerName: "First Name", flex: 1.5 },
    { field: "lastName", headerName: "Last Name", flex: 1.5 },
    { 
      field: "age", 
      headerName: "Age", 
      flex: 1,
      renderCell: ({ value }) => <Chip label={value} size="small" color="primary" />
    },
    { 
      field: "department", 
      headerName: "Department", 
      flex: 1.5,
      renderCell: ({ value }) => <Chip label={value} size="small" variant="outlined" />
    },
    { 
      field: "status", 
      headerName: "Status", 
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={value} size="small" color={value === "Active" ? "success" : "warning"} />
      )
    }
  ];

  const handleConnect = async () => {
    if (!connectionForm.server || !connectionForm.database || !connectionForm.username || !connectionForm.password) return;
    
    setConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnected(true);
    setConnecting(false);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setConnectionForm({ server: "", database: "", username: "", password: "" });
  };

  const handleAssessment = async () => {
    if (!connected) return;
    
    setAssessmentRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setLastAssessment({
      timestamp: new Date().toLocaleString(),
      totalRecords: tableData.length,
      issues: Math.floor(Math.random() * 5),
      recommendations: Math.floor(Math.random() * 8) + 2
    });
    setAssessmentRunning(false);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "First Name", "Last Name", "Age", "Department", "Status"];
    const csvContent = [
      headers.join(","),
      ...tableData.map(row => 
        `${row.id},${row.firstName},${row.lastName},${row.age},${row.department},${row.status}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Migration_Report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const isFormValid = () => {
    return connectionForm.server && connectionForm.database && connectionForm.username && connectionForm.password;
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
      <Circle position={"fixed"} top={"78%"} right={"86%"} borderRadius={50} bgColor={"#ffc0cb42"} />
      <Circle position={"fixed"} bottom={"65%"} left={"88%"} borderRadius={50} bgColor={"#2196f342"} />
      
      {/* AppBar */}
      <AppBar position="fixed" sx={{ width: '96%', left: '50%', top: '2%', transform: 'translate(-50%, -2%)' }}>
        <Toolbar>
          <Storage sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Database Migration Console
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            {connected && <Chip icon={<CheckCircle />} label="Connected" color="success" size="small" />}
            <Button color="inherit" startIcon={<ExitToApp />} onClick={() => setLogoutDialog(true)}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 8, py: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3} boxShadow={5}>
              {/* Connection Form */}
              <Card>
                <CardContent>
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }} gutterBottom color="primary">
                    Database Connection
                  </Typography>

                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Server Environment</InputLabel>
                      <Select
                        value={connectionForm.server}
                        label="Server Environment"
                        onChange={(e) => setConnectionForm(prev => ({ ...prev, server: e.target.value }))}
                      >
                        <MenuItem value="prod">Production Server</MenuItem>
                        <MenuItem value="staging">Staging Server</MenuItem>
                        <MenuItem value="dev">Development Server</MenuItem>
                        <MenuItem value="test">Testing Server</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Database</InputLabel>
                      <Select
                        value={connectionForm.database}
                        label="Database"
                        onChange={(e) => setConnectionForm(prev => ({ ...prev, database: e.target.value }))}
                      >
                        <MenuItem value="users">User Management DB</MenuItem>
                        <MenuItem value="products">Product Catalog DB</MenuItem>
                        <MenuItem value="analytics">Analytics DB</MenuItem>
                        <MenuItem value="inventory">Inventory DB</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Username"
                      value={connectionForm.username}
                      onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          )
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={connectionForm.password}
                      onChange={(e) => setConnectionForm(prev => ({ ...prev, password: e.target.value }))}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}
                    />

                    <Stack spacing={1}>
                      {!connected ? (
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handleConnect}
                          disabled={!isFormValid() || connecting}
                        >
                          {connecting ? "CONNECTING..." : "CONNECT"}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleDisconnect}
                          color="error"
                        >
                          DISCONNECT
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Assessment />}
                        onClick={handleAssessment}
                        disabled={!connected || assessmentRunning}
                        color="warning"
                      >
                        {assessmentRunning ? "RUNNING..." : "RUN ASSESSMENT"}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Assessment Results */}
              {lastAssessment && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="warning.main">
                      <Assessment sx={{ mr: 1, verticalAlign: "middle" }} />
                      Last Assessment
                    </Typography>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        {lastAssessment.timestamp}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Total Records:</Typography>
                        <Chip label={lastAssessment.totalRecords} size="small" color="primary" />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Issues Found:</Typography>
                        <Chip 
                          label={lastAssessment.issues} 
                          size="small" 
                          color={lastAssessment.issues > 0 ? "warning" : "success"} 
                        />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Recommendations:</Typography>
                        <Chip label={lastAssessment.recommendations} size="small" color="info" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8} boxShadow={5}>
            <Card>
              <CardContent>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
                      Data Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Manage and export your database records
                    </Typography>
                    
                    <Stack direction="row" spacing={1}>
                      <Chip
                        icon={connected ? <CheckCircle /> : <Warning />}
                        label={connected ? `Connected to ${connectionForm.database}` : "Not Connected"}
                        color={connected ? "success" : "warning"}
                      />
                      <Chip label={`${tableData.length} Records`} color="primary" variant="outlined" />
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={handleExportCSV}
                    disabled={!connected}
                  >
                    Export CSV
                  </Button>
                </Stack>

                {/* Connection Alert */}
                {!connected && (
                  <Alert severity="info" icon={<Info />} sx={{ mb: 3 }}>
                    Please establish a database connection to view and export data.
                  </Alert>
                )}

                {/* Data Grid */}
                <Box sx={{ width: "100%", minWidth: 1000, overflowX: 'auto' }}>
                  <DataGrid
                    disableColumnResize
                    disableAutosize
                    disableColumnFilter
                    disableColumnSelector
                    rows={tableData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                      }
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Dialog */}
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout? Your database connection will be terminated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setLogoutDialog(false);
              handleDisconnect();
              navigate("/login");
            }}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
