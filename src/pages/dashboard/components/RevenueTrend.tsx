import {
  Card,
  CardHeader,
  FormControl,
  Select,
  MenuItem,
  Divider,
  CardContent,
  useTheme,
  Box,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { getDashboardCardSx, getCardHeaderSx, titleCardSx } from './DashboardStyles';
import { type DashboardHooksType } from '../Dashboard.types';
import { useRef } from 'react';
import { useChartContainerWidth } from '../../../hooks/useChartContainerWidth';

export const RevenueTrend = ({
  tDashboard,
  revenueFilter,
  setRevenueFilter,
  revenueData,
}: DashboardHooksType) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartWidth = useChartContainerWidth(containerRef);

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('revenue.title')}
        sx={getCardHeaderSx(theme)}
        titleTypographyProps={{ sx: titleCardSx }}
        action={
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <Select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value as 'week' | 'month' | 'year')}
              sx={{
                borderRadius: 2,
                '& .MuiSelect-select': { py: 0.75, fontSize: '0.875rem' },
              }}
            >
              <MenuItem value="week">{tDashboard('revenue.filter.week')}</MenuItem>
              <MenuItem value="month">{tDashboard('revenue.filter.month')}</MenuItem>
              <MenuItem value="year">{tDashboard('revenue.filter.year')}</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent sx={{ pt: 4, pb: 2, px: { xs: 1, sm: 2 } }}>
        <Box ref={containerRef} sx={{ width: '100%', overflow: 'hidden' }}>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: revenueData.labels,
              },
            ]}
            series={[
              {
                data: revenueData.data,
                label: tDashboard('revenue.label'),
                color: theme.palette.primary.main,
                showMark: true,
                curve: 'catmullRom',
                valueFormatter: (value) => new Intl.NumberFormat('vi-VN').format(value || 0) + ' ₫',
              },
            ]}
            width={chartWidth}
            height={350}
            margin={{ left: 80, right: 30, top: 30, bottom: 30 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
