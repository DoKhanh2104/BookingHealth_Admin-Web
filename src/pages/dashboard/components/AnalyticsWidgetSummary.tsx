import { Card, Typography, Box, alpha, useTheme, type SxProps, type Theme } from '@mui/material';

interface Props {
  title: string;
  total: number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  sx,
  color = 'primary',
}: Props) {
  const theme = useTheme();

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

      <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
        {title}
      </Typography>
    </Card>
  );
}
