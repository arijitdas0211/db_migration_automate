import { Lock, Person, Visibility, VisibilityOff, Storage, Computer, CheckCircle, Error, Cable } from "@mui/icons-material"; 
import { Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography, Box, Chip, Alert, Divider, LinearProgress, Paper } from "@mui/material"; 
import { useState } from "react";

// Connection Form Component
export default function ConnectionForm({ form, setForm, connected, connecting, onConnect, onDisconnect }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const isValid = form.server && form.database && form.username && form.password;

  return (
    <Card 
      sx={{ 
        mt: 1,
        height: 'fit-content',
        boxShadow: connected ? '0 8px 32px rgba(76, 175, 80, 0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
        border: connected ? '2px solid' : '1px solid',
        borderColor: connected ? 'success.main' : 'divider',
        transition: 'all 0.3s ease-in-out',
        background: connected ? 'linear-gradient(135deg, #f8fffe 0%, #f0fff4 100%)' : 'background.paper'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with Connection Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Cable color={connected ? "success" : "primary"} />
            <Typography variant="h6" color={connected ? "success.main" : "primary"} fontWeight={600}>
              Database Connection
            </Typography>
          </Box>
          &nbsp;
          <Chip 
            icon={connected ? <CheckCircle /> : <Error />}
            label={connected ? "Connected" : "Disconnected"}
            color={connected ? "success" : "default"}
            variant={connected ? "filled" : "outlined"}
            size="small"
          />
        </Box>

        {connecting && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress sx={{ borderRadius: 1 }} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Establishing connection...
            </Typography>
          </Box>
        )}

        <Stack spacing={2.5}>
          {/* Server Environment */}
          <FormControl fullWidth>
            <InputLabel>Server Environment</InputLabel>
            <Select 
              value={form.server} 
              label="Server Environment" 
              onChange={(e) => setForm(prev => ({ ...prev, server: e.target.value }))}
              startAdornment={
                <InputAdornment position="start">
                  <Computer color="action" />
                </InputAdornment>
              }
              disabled={connected}
            >
              <MenuItem value="mysql">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>MySQL</span>
                </Box>
              </MenuItem>
              <MenuItem value="postgre">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>PostgreSQL</span>
                </Box>
              </MenuItem>
              <MenuItem value="mssql">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>MS SQL Server</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          
          {/* Database */}
          <FormControl fullWidth>
            <InputLabel>Database</InputLabel>
            <Select 
              value={form.database} 
              label="Database" 
              onChange={(e) => setForm(prev => ({ ...prev, database: e.target.value }))}
              startAdornment={
                <InputAdornment position="start">
                  <Storage color="action" />
                </InputAdornment>
              }
              disabled={connected}
            >
              <MenuItem value="users">
                  <span>User Management</span>
              </MenuItem>
              <MenuItem value="products">
                  <span>Product Catalog</span>
              </MenuItem>
              <MenuItem value="analytics">
                  <span>Analytics</span>
              </MenuItem>
            </Select>
          </FormControl>

          {/* Username */}
          <TextField
            fullWidth 
            label="Username" 
            value={form.username}
            onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
            InputProps={{ 
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ) 
            }}
            disabled={connected}
            variant="outlined"
          />

          {/* Password */}
          <TextField
            fullWidth 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            value={form.password}
            onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={connected}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            disabled={connected}
            variant="outlined"
          />

          {/* Connection Summary when connected */}
          {connected && (
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: 'success.50', 
                border: '1px solid', 
                borderColor: 'success.200',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" color="success.dark" sx={{ mb: 1, fontWeight: 600 }}>
                Active Connection
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label={`DB Env: ${form.server?.toUpperCase()}`} 
                  size="small" 
                  color="success"
                  variant="outlined"
                />
                <Chip 
                  label={`DB Name: ${form.database?.toUpperCase()}`} 
                  size="small" 
                  color="success"
                  variant="outlined"
                />
              </Box>
            </Paper>
          )}

          <Divider sx={{ my: 1 }} />

          {/* Action Button */}
          {!connected ? (
            <Button 
              variant="contained" 
              size="large"
              fullWidth 
              onClick={onConnect} 
              disabled={!isValid || connecting}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: isValid && !connecting ? '0 4px 12px rgba(25, 118, 210, 0.3)' : 'none',
                '&:hover': {
                  boxShadow: isValid ? '0 6px 16px rgba(25, 118, 210, 0.4)' : 'none',
                  transform: isValid ? 'translateY(-1px)' : 'none',
                }
              }}
            >
              {connecting ? "Connecting..." : "Connect to Database"}
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              size="large"
              fullWidth 
              onClick={onDisconnect} 
              color="error"
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-1px)',
                }
              }}
            >
              Disconnect
            </Button>
          )}

          {/* Validation Alert */}
          {!isValid && !connected && (
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': { fontSize: '0.875rem' }
              }}
            >
              Please fill in all fields to establish connection
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
