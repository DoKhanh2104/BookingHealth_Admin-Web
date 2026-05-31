import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { DRAWER_WIDTH } from './layoutConstants';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isDesktop ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
        ml: isDesktop ? `${DRAWER_WIDTH}px` : 0,
        // Hiệu ứng Kính (Glassmorphism) cực kỳ Wow
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        // Viền dưới tinh tế
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ minHeight: '76px !important', px: { xs: 2, md: 4 } }}>
        {/* Hamburger menu — chỉ hiện trên mobile */}
        {!isDesktop && (
          <IconButton
            color="inherit"
            aria-label="open sidebar"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Khoảng trống đẩy các icon sang mép phải */}
        <Box sx={{ flexGrow: 1 }} />

        {/* 3. Khu vực Avatar User */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              ml: 1,
              cursor: 'pointer',
              pr: 1,
              py: 0.5,
              borderRadius: 20,
              transition: 'all 0.2s',
              // Hover vào Avatar sẽ có hiệu ứng viền nền mờ xám
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
            }}
          >
            <Avatar
              alt="Admin Profile"
              src="https://ui-avatars.com/api/?name=Quốc+Khánh&background=1976d2&color=fff&size=150"
              sx={{ width: 44, height: 44, boxShadow: 1 }}
            />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}
              >
                Quốc Khánh
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500 }}>
                Super Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
