import Main from '../../layouts/Main';
import {
  Typography,
  Stack,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { useDashboardHooks } from './Dashboard.hooks';
import {
  AnalyticsRounded,
  PeopleRounded,
  LocalHospitalRounded,
  EventNoteRounded,
} from '@mui/icons-material';
import AnalyticsWidgetSummary from './components/AnalyticsWidgetSummary';
import { PendingList } from './components/PendingList';
import { BookingStatus } from './components/BookingStatus';
import { SpecialtyDistribution } from './components/SpecialtyDistribution';
import { TopDoctors } from './components/TopDoctors';
import { RecentFeedbacks } from './components/RecentFeedbacks';
import { RevenueTrend } from './components/RevenueTrend';
import { getTimeFilterSx } from './components/DashboardStyles';

const Dashboard = () => {
  const theme = useTheme();
  const hooks = useDashboardHooks();
  const { tDashboard } = hooks;

  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('day');

  return (
    <Main>
      {/* Intro — responsive: column trên mobile, row trên desktop */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', mb: 4, gap: 2 }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
            {tDashboard('title')}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {tDashboard('description')}
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={getTimeFilterSx()}>
            <InputLabel>{tDashboard('time.labelTime')}</InputLabel>
            <Select
              value={timeFilter}
              label={tDashboard('time.labelTime')}
              onChange={(e) => setTimeFilter(e.target.value as 'day' | 'week' | 'month')}
            >
              <MenuItem value="day">{tDashboard('time.today')}</MenuItem>
              <MenuItem value="week">{tDashboard('time.week')}</MenuItem>
              <MenuItem value="month">{tDashboard('time.month')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* Statistics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={tDashboard('card.totalBooking')}
            percent={12.5}
            subtext="so với hôm qua"
            total={128}
            icon={<EventNoteRounded sx={{ width: 32, height: 32 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={tDashboard('card.newDoctor')}
            percent={2.4}
            subtext="so với tuần trước"
            total={15}
            icon={<LocalHospitalRounded sx={{ width: 32, height: 32 }} />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={tDashboard('card.newUser')}
            percent={-0.5}
            subtext="so với tháng trước"
            total={1240}
            icon={<PeopleRounded sx={{ width: 32, height: 32 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title={tDashboard('card.revenue')}
            percent={8.2}
            subtext="so với hôm qua"
            total={2000}
            icon={<AnalyticsRounded sx={{ width: 32, height: 32 }} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Pending Action */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <PendingList {...hooks} />
        </Grid>
      </Grid>

      {/* Booking Status & Specialty Distribution */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <BookingStatus {...hooks} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SpecialtyDistribution {...hooks} />
        </Grid>
      </Grid>

      {/* Ranking & Feedbacks */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <TopDoctors {...hooks} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentFeedbacks {...hooks} />
        </Grid>
      </Grid>

      {/* Report */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <RevenueTrend {...hooks} />
        </Grid>
      </Grid>
    </Main>
  );
};

export default Dashboard;
