import { Card, CardHeader, Divider, CardContent, useTheme, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  getDashboardCardSx,
  getCardHeaderSx,
  cardContentCenterSx,
  titleCardSx,
} from './DashboardStyles';
import { type DashboardHooksType } from '../Dashboard.types';
import { useRef } from 'react';
import { useChartContainerWidth } from '../../../hooks/useChartContainerWidth';

export const SpecialtyDistribution = ({ tDashboard, specialtyData }: DashboardHooksType) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWidth = useChartContainerWidth(containerRef);

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('specialty.title')}
        sx={getCardHeaderSx(theme)}
        titleTypographyProps={{ sx: titleCardSx }}
      />
      <Divider />
      <CardContent sx={cardContentCenterSx}>
        <Box
          ref={containerRef}
          sx={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
        >
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
            width={chartWidth}
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
