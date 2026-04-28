import { Card, CardHeader, Divider, CardContent, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { getDashboardCardSx } from './DashboardStyles';
import { type DashboardHooksType } from '../Dashboard.types';

export const SpecialtyDistribution = ({ tDashboard, specialtyData }: DashboardHooksType) => {
  const theme = useTheme();

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('specialty.title')}
        titleTypographyProps={{ fontWeight: 700 }}
        sx={{ px: 4, color: theme.palette.text.primary }}
      />
      <Divider />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <BarChart
          dataset={specialtyData}
          xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
          series={[
            {
              dataKey: 'value',
              label: tDashboard('specialty.visits'),
              color: theme.palette.info.main,
            },
          ]}
          width={500}
          height={300}
        />
      </CardContent>
    </Card>
  );
};
