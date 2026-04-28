import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    width: '350px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    // padding thêm bên trái bằng vị trí của icon Search
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: 14,
    '&::placeholder': {
      color: theme.palette.text.disabled,
    },
  },
}));

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        // Hiệu ứng Kính (Glassmorphism) cực kỳ Wow
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        // Viền dưới tinh tế
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: '76px !important', px: { xs: 2, md: 4 } }}>
        {/* 1. Thanh tìm kiếm */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm kiếm bệnh nhân, bác sĩ..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Khoảng trống đẩy các icon sang mép phải */}
        <Box sx={{ flexGrow: 1 }} />

        {/* 2. Cụm icon chức năng bên phải */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title="Cài đặt">
            <IconButton
              size="large"
              sx={{
                bgcolor: 'rgba(0,0,0,0.03)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
              }}
            >
              <SettingsIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Thông báo">
            <IconButton
              size="large"
              sx={{
                bgcolor: 'rgba(0,0,0,0.03)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* 3. Khu vực Avatar User */}
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
              src="https://i.pravatar.cc/150?img=11"
              sx={{ width: 44, height: 44, boxShadow: 1 }}
            />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}
              >
                Q. Khanh
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
