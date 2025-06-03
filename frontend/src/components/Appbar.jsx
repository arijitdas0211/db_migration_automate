import { CheckCircle, ExitToApp, Storage } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Chip,
  Stack,
  Toolbar,
  Typography,
  Box,
  alpha,
} from "@mui/material";

export default function Appbar({ conStatus, setLogoutDialogFunc, setLogoutDialogStatus }) {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          zIndex: 1500,
          width: "96%",
          position: "fixed",
          top: "2%",
          left: "50%",
          transform: "translate(-50%, -2%)",
          borderRadius: 3,
          background: (theme) => 
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backdropFilter: 'blur(10px)',
          border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          boxShadow: (theme) => 
            `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}, 0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
        }}
      >
        <Toolbar sx={{ minHeight: '72px !important', px: 3 }}>
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mr: 'auto',
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: (theme) => alpha(theme.palette.common.white, 0.15),
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: (theme) => alpha(theme.palette.common.white, 0.25),
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Storage sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2,
                }}
              >
                Database Migration
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: (theme) => alpha(theme.palette.common.white, 0.8),
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Console
              </Typography>
            </Box>
          </Box>

          {/* Status and Actions Section */}
          <Stack direction="row" spacing={2} alignItems="center">
            {conStatus && (
              <Chip
                icon={<CheckCircle sx={{ fontSize: '18px !important' }} />}
                label="Connected"
                size="medium"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.2),
                  color: theme => theme.palette.success.light,
                  border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                  backdropFilter: 'blur(5px)',
                  fontWeight: 600,
                  px: 1,
                  '& .MuiChip-icon': {
                    color: theme => theme.palette.success.light,
                  },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.3),
                    transform: 'scale(1.02)',
                  },
                }}
              />
            )}
            
            {conStatus && (
              <Button
                variant="contained"
                startIcon={<ExitToApp />}
                onClick={() => setLogoutDialogFunc(setLogoutDialogStatus)}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.common.white, 0.15),
                  color: 'white',
                  border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  backdropFilter: 'blur(5px)',
                  borderRadius: 2.5,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  minHeight: 42,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.15),
                    borderColor: (theme) => alpha(theme.palette.error.main, 0.3),
                    transform: 'translateY(-1px)',
                    boxShadow: (theme) => 
                      `0 4px 16px ${alpha(theme.palette.error.main, 0.2)}`,
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
