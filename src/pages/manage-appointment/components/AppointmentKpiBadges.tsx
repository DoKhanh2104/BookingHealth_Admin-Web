import { Box, Card, Typography } from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircle as CheckCircleIcon,
  TaskAlt as TaskAltIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { type KpiData } from '../ManageAppointment.types';

interface Props {
  kpi: KpiData;
  t: (key: string) => string;
}

const AppointmentKpiBadges = ({ kpi, t }: Props) => {
  const kpiItems = [
    {
      label: t('kpi.total'),
      value: kpi.total,
      icon: <CalendarMonthIcon sx={{ color: 'primary.main' }} />,
      bgColor: 'rgba(25, 118, 210, 0.1)',
      color: 'primary.main',
    },
    {
      label: t('kpi.pending'),
      value: kpi.pending,
      icon: <HourglassEmptyIcon sx={{ color: 'warning.main' }} />,
      bgColor: 'rgba(237, 108, 2, 0.1)',
      color: 'warning.main',
    },
    {
      label: t('kpi.confirmed'),
      value: kpi.confirmed,
      icon: <CheckCircleIcon sx={{ color: 'info.main' }} />,
      bgColor: 'rgba(2, 136, 209, 0.1)',
      color: 'info.main',
    },
    {
      label: t('kpi.completed'),
      value: kpi.completed,
      icon: <TaskAltIcon sx={{ color: 'success.main' }} />,
      bgColor: 'rgba(46, 125, 50, 0.1)',
      color: 'success.main',
    },
    {
      label: t('kpi.cancelled'),
      value: kpi.cancelled,
      icon: <CancelIcon sx={{ color: 'error.main' }} />,
      bgColor: 'rgba(211, 47, 47, 0.1)',
      color: 'error.main',
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      {kpiItems.map((item, index) => (
        <Card
          key={index}
          sx={{
            flex: '1 1 150px',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderRadius: 3,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: item.bgColor,
            }}
          >
            {item.icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {item.label}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: item.color }}>
              {item.value}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default AppointmentKpiBadges;
