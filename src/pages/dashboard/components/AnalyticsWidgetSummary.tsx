import {
  Card,
  Typography,
  Stack,
  alpha,
  Box,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface Props {
  title: string;
  total: number;
  percent: number;
  subtext: string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  percent,
  subtext,
  icon,
  sx,
  color = 'primary',
}: Props) {
  const theme = useTheme();

  const isPositive = percent >= 0;

  // Use the provided color or fallback to primary
  const mainColor = theme.palette[color]?.main || theme.palette.primary.main;

  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '24px',
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(mainColor, 0.08)}`,
        boxShadow: `0 0 2px 0 ${alpha(mainColor, 0.2)}, 0 12px 24px -4px ${alpha(mainColor, 0.12)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 0 2px 0 ${alpha(mainColor, 0.2)}, 0 20px 40px -4px ${alpha(mainColor, 0.16)}`,
          borderColor: alpha(mainColor, 0.3),
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          mb: 2.5,
          width: 48,
          height: 48,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${mainColor} 0%, ${alpha(mainColor, 0.7)} 100%)`,
          color: '#fff',
          boxShadow: `0 8px 16px 0 ${alpha(mainColor, 0.24)}`,
        }}
      >
        {icon}
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: theme.palette.text.primary }}>
        {total.toLocaleString()}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ color: theme.palette.text.secondary, fontWeight: 600, mb: 2 }}
      >
        {title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: isPositive ? 'success.main' : 'error.main',
            bgcolor: isPositive
              ? alpha(theme.palette.success.main, 0.1)
              : alpha(theme.palette.error.main, 0.1),
            px: 1,
            py: 0.25,
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {isPositive ? (
            <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
          ) : (
            <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
          )}
          {isPositive ? '+' : ''}
          {percent}%
        </Box>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {subtext}
        </Typography>
      </Stack>
    </Card>
  );
}
