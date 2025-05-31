import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DataTable from "../components/DataTable";
import { ExportCsv } from "@mui/x-data-grid";

const drawerWidth = 300;

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [serverName, setServerName] = useState("");
  const [dbName, setDbName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const servers = [
    { name: "Localhost" },
    { name: "Ms-SQL" },
    { name: "Mongo DB" },
  ];

  const database = [
    { name: "DB1" },
    { name: "DB2" },
    { name: "DB3" },
    { name: "DB4" },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #745fd8 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(240, 244, 255, 0.95)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Toolbar
          sx={{
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              letterSpacing: 0.5,
            }}
          >
            Database Connection
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ p: 3 }}>
          <ListItem sx={{ mb: 3, px: 0 }}>
            <FormControl fullWidth>
              <InputLabel
                id="server-select-label"
                sx={{
                  fontWeight: 500,
                  "&.Mui-focused": { color: theme.palette.primary.main },
                }}
              >
                Select Server
              </InputLabel>
              <Select
                labelId="server-select-label"
                id="server-select"
                value={serverName}
                label="Select Server"
                onChange={(e) => setServerName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              >
                {servers &&
                  servers.map((item, i) => (
                    <MenuItem key={i} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>

          <ListItem sx={{ mb: 3, px: 0 }}>
            <FormControl fullWidth>
              <InputLabel
                id="database-select-label"
                sx={{
                  fontWeight: 500,
                  "&.Mui-focused": { color: theme.palette.primary.main },
                }}
              >
                Select Database
              </InputLabel>
              <Select
                labelId="database-select-label"
                id="database-select"
                value={dbName}
                label="Select Database"
                onChange={(e) => setDbName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              >
                {database &&
                  database.map((item, i) => (
                    <MenuItem key={i} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>

          <ListItem sx={{ mb: 3, px: 0 }}>
            <FormControl fullWidth>
              <TextField
                id="username-field"
                label="DB Username"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    "&.Mui-focused": { color: theme.palette.primary.main },
                  },
                }}
              />
            </FormControl>
          </ListItem>

          <ListItem sx={{ mb: 4, px: 0 }}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="password-field"
                type={showPassword ? "text" : "password"}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    "&.Mui-focused": { color: theme.palette.primary.main },
                  },
                }}
              />
            </FormControl>
          </ListItem>

          <ListItem
            sx={{ px: 0, display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                  boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Connect
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)",
                boxShadow: "0 3px 5px 2px rgba(255, 152, 0, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #F57C00 30%, #FFA726 90%)",
                  boxShadow: "0 6px 10px 4px rgba(255, 152, 0, .3)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Assessment
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #745fd8 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/home"
              underline="none"
              sx={{ color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  alignItems: "center",
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: alpha("#ffffff", 0.15),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="#FFFFFF"
                      fillRule="evenodd"
                      d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
                DBMT
              </Typography>
            </Link>
          </Box>

          <Link
            component="button"
            underline="none"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              px: 3,
              py: 1,
              borderRadius: 3,
              backgroundColor: alpha("#ffffff", 0.1),
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.2),
                transform: "translateY(-1px)",
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Logout
            <ExitToAppIcon />
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="database connection"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
              boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Toolbar />
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: 'flex',
              justifyContent: 'space-between', pb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #745fd8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Database Migration Console
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                  boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
                  transform: "translateY(-2px)",
                  color: "white",
                },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => ExportCsv}
            >
              Export as CSV
            </Button>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          ></Typography>

          {/* Main content here... */}
          <DataTable />
        </Paper>
      </Box>
    </Box>
  );
}

export default Home;
