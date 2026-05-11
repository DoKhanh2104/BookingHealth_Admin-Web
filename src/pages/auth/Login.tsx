import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useLoginHooks } from './Login.hooks';

const Login: React.FC = () => {
  const {
    t,
    formData,
    loading,
    errors,
    showPassword,
    handleChange,
    handleTogglePassword,
    handleLogin,
  } = useLoginHooks();

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 450,
        mx: 'auto',
        borderRadius: 4,
        boxShadow: (theme) =>
          `0 10px 40px ${theme.palette.primary.main}40, 0 2px 10px ${theme.palette.primary.main}20`,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 2,
          px: 3,
          textAlign: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        <Typography variant="h4" fontWeight={800} gutterBottom>
          BookingHealth
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {t('subtitle')}
        </Typography>
      </Box>

      <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t('fields.username')}
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('fields.password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: (theme) => `0 8px 20px ${theme.palette.primary.main}40`,
              '&:hover': {
                boxShadow: (theme) => `0 12px 25px ${theme.palette.primary.main}60`,
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : t('buttons.login')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
