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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const drawerWidth = 300;

function Home() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [serverName, setServerName] = useState("");

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

  const handleChange = (e) => {
    setServerName(e.target.value);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
            Select Server
          </Typography>
        </ListItem>
        <ListItem sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Server</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={serverName}
              label="Server"
              onChange={handleChange}
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
        <ListItem sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
            Select Database
          </Typography>
        </ListItem>
        <ListItem sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">DB</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={serverName}
              label="Server"
              onChange={handleChange}
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
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          bgcolor: "blueviolet",
          flexDirection: "row",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
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
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="#FFFFFF"
                  fillrule="evenodd"
                  d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z"
                  cliprule="evenodd"
                />
              </svg>
              DMT
            </Typography>
          </Link>
        </Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Link
          component="button"
          underline="none"
          sx={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 5,
            color: "white",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Logout
          <ExitToAppIcon />
        </Link>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>
          
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
