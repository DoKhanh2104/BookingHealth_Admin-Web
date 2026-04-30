import { Card, CardHeader, Divider, CardContent, useTheme, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { type DashboardHooksType } from '../Dashboard.types';
import {
  getDashboardCardSx,
  cardContentCenterSx,
  titleCardSx,
  getCardHeaderSx,
} from './DashboardStyles';
import { useRef } from 'react';
import { useChartContainerWidth } from '../../../hooks/useChartContainerWidth';

export const BookingStatus = ({ tDashboard, bookingStatusData }: DashboardHooksType) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWidth = useChartContainerWidth(containerRef);

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('bookingStatus.title')}
        sx={getCardHeaderSx(theme)}
        titleTypographyProps={{ sx: titleCardSx }}
      />
      <Divider />
      <CardContent sx={cardContentCenterSx}>
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <PieChart
            series={[
              {
                data: bookingStatusData(theme),
                innerRadius: Math.min(chartWidth * 0.15, 80),
                outerRadius: Math.min(chartWidth * 0.22, 120),
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={300}
            height={300}
            slotProps={{
              legend: {
                direction: chartWidth < 400 ? ('horizontal' as const) : ('vertical' as const),
                position:
                  chartWidth < 400
                    ? { vertical: 'bottom' as const, horizontal: 'center' as const }
                    : { vertical: 'middle' as const, horizontal: 'end' as const },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
