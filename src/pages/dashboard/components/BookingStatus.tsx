import { Card, CardHeader, Divider, CardContent, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { type DashboardHooksType } from '../Dashboard.types';
import { getDashboardCardSx } from './DashboardStyles';

export const BookingStatus = ({ tDashboard, bookingStatusData }: DashboardHooksType) => {
  const theme = useTheme();

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('bookingStatus.title')}
        titleTypographyProps={{ fontWeight: 700 }}
        sx={{ px: 4, color: theme.palette.text.primary }}
      />
      <Divider />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <PieChart
          series={[
            {
              data: bookingStatusData(theme),
              innerRadius: 80,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={300}
          slotProps={{
            legend: {
              direction: 'vertical',
              position: { vertical: 'middle', horizontal: 'end' },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
