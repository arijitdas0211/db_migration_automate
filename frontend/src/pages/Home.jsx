import { useState } from "react";
import { 
  Box, Card, CardContent, Typography, Button, Chip, Container, Alert, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Tabs, Tab
} from "@mui/material"; 
import { Warning, Info, Download, CheckCircle } from "@mui/icons-material";
import DataTable from "../components/DataTable";
import ConnectionForm from "../components/Connections";
import Appbar from "../components/Appbar";
import DBReportView from "../components/DBReportView";


export default function Home() {
  const [connectionForm, setConnectionForm] = useState({ 
    server: "", database: "", username: "", password: "" 
  });
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

// Sample columns and data for different tabs
  const columns = {
    users: [
      { field: "id", headerName: "#", width: '5%' },
      { field: "firstName", headerName: "First Name", width: '20%' },
      { field: "lastName", headerName: "Last Name", width: '20%' },
      { field: "age", headerName: "Age", width: '10%', renderCell: ({ value }) => <Chip label={value} size="small" color="primary" /> },
      { field: "department", headerName: "Department", width: '25%', renderCell: ({ value }) => <Chip label={value} size="small" variant="outlined" /> },
      { field: "status", headerName: "Status", width: '20%', renderCell: ({ value }) => <Chip label={value} size="small" color={value === "Active" ? "success" : "warning"} /> }
    ],
    products: [
      { field: "id", headerName: "#", width: '5%' },
      { field: "name", headerName: "Product", width: '25%' },
      { field: "category", headerName: "Category", width: '20%' },
      { field: "price", headerName: "Price", width: '15%', renderCell: ({ value }) => `Rs.${value}` },
      { field: "stock", headerName: "Stock", width: '15%', renderCell: ({ value }) => <Chip label={value} size="small" color={value < 100 ? "warning" : "success"} /> },
      { field: "supplier", headerName: "Supplier", width: '20%' }
    ],
    analytics: [
      { field: "id", headerName: "#", width: '5%' },
      { field: "metric", headerName: "Metric", width: '30%' },
      { field: "value", headerName: "Value", width: '20%' },
      { field: "trend", headerName: "Trend", width: '20%', renderCell: ({ value }) => <Chip label={value} size="small" color={value === "Up" ? "success" : "info"} /> },
      { field: "period", headerName: "Period", width: '25%' }
    ]
  };

  const tabData = {
    users: [
      { id: 1, firstName: "John", lastName: "Smith", age: 35, department: "Engineering", status: "Active" },
      { id: 2, firstName: "Sarah", lastName: "Johnson", age: 42, department: "Marketing", status: "Active" },
      { id: 3, firstName: "Michael", lastName: "Brown", age: 28, department: "Sales", status: "Inactive" },
      { id: 4, firstName: "Emily", lastName: "Davis", age: 31, department: "HR", status: "Active" },
      { id: 5, firstName: "Robert", lastName: "Wilson", age: 45, department: "Finance", status: "Active" },
      { id: 6, firstName: "Lisa", lastName: "Anderson", age: 33, department: "IT", status: "Active" },
      { id: 7, firstName: "David", lastName: "Taylor", age: 29, department: "Sales", status: "Inactive" },
    ],
    products: [
      { id: 1, name: "Laptop", category: "Electronics", price: 999, stock: 50, supplier: "TechCorp" },
      { id: 2, name: "Mouse", category: "Accessories", price: 29, stock: 200, supplier: "GadgetInc" },
      { id: 3, name: "Keyboard", category: "Accessories", price: 79, stock: 150, supplier: "TechCorp" },
      { id: 4, name: "Monitor", category: "Electronics", price: 299, stock: 75, supplier: "DisplayTech" },
      { id: 5, name: "Webcam", category: "Electronics", price: 89, stock: 30, supplier: "TechCorp" },
      { id: 6, name: "Headset", category: "Accessories", price: 59, stock: 120, supplier: "AudioPro" },
    ],
    analytics: [
      { id: 1, metric: "Page Views", value: "15,420", trend: "Up", period: "This Month" },
      { id: 2, metric: "Users", value: "3,240", trend: "Up", period: "This Month" },
      { id: 3, metric: "Bounce Rate", value: "24.5%", trend: "Down", period: "This Month" },
      { id: 4, metric: "Conversion", value: "4.2%", trend: "Up", period: "This Month" },
      { id: 5, metric: "Revenue", value: "Rs.12,540", trend: "Up", period: "This Month" },
    ]
  };

  const tabNames = Object.keys(columns)
  const tabKeys = Object.keys(tabData);

  const handleConnect = async () => {
    setConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnected(true);
    setConnecting(false);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setConnectionForm({ server: "", database: "", username: "", password: "" });
  };

  const handleExportExcel = () => {
    // Create combined data for all tabs
    let csvContent = "";
    Object.entries(tabData).forEach(([tabName, data], index) => {
      if (index > 0) csvContent += "\n\n";
      csvContent += `=== ${tabName.toUpperCase()} ===\n`;
      
      const headers = columns[tabName].map(col => col.headerName);
      csvContent += headers.join(",") + "\n";
      
      data.forEach(row => {
        const values = columns[tabName].map(col => row[col.field] || "");
        csvContent += values.join(",") + "\n";
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Database_Export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const currentTabKey = tabKeys[activeTab];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: 'grey.50' }}>
      {/* AppBar */}
      <Appbar conStatus={connected} setLogoutDialogFunc={setLogoutDialog} setLogoutDialogStatus={true} />

      <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Grid container spacing={3}>
          {/* Connection Sidebar */}
          <Grid item xs={12} lg={3}>
            <ConnectionForm
              form={connectionForm}
              setForm={setConnectionForm}
              connected={connected}
              connecting={connecting}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </Grid>

          {/* Main Content - Full width on mobile, rest of space on desktop */}
          <Grid item xs={12} lg={9}>
            <DBReportView conStatus={connected} 
                          conForm={connectionForm} 
                          tableData={tabData} 
                          currTabKey={currentTabKey} 
                          exportFile={handleExportExcel} 
                          activeTab={activeTab} 
                          setActiveTab={setActiveTab} 
                          tabNames={tabNames} 
                          tableCols={columns}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Logout Dialog */}
      {!connected ? '' : (
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
            }}
            color="error" 
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </Box>
  );
}
