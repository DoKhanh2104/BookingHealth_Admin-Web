import Main from '../../layouts/Main';
import { Typography, Stack, useTheme, Grid, CircularProgress, Alert, Box } from '@mui/material';
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

const Dashboard = () => {
  const theme = useTheme();
  const hooks = useDashboardHooks();
  const { tDashboard, loading, error, summary } = hooks;

  return (
    <Main>
      {/* Intro — responsive: column trên mobile, row trên desktop */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 4,
          gap: 2,
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
            {tDashboard('title')}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {tDashboard('description')}
          </Typography>
        </Stack>
      </Stack>

      {/* Error banner */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading overlay */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <>
          {/* Statistics */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title={tDashboard('card.totalBooking')}
                total={summary.totalBookings}
                icon={<EventNoteRounded sx={{ width: 32, height: 32 }} />}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title={tDashboard('card.newDoctor')}
                total={summary.newDoctors}
                icon={<LocalHospitalRounded sx={{ width: 32, height: 32 }} />}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title={tDashboard('card.newUser')}
                total={summary.newUsers}
                icon={<PeopleRounded sx={{ width: 32, height: 32 }} />}
                color="warning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title={tDashboard('card.revenue')}
                total={summary.totalRevenue}
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
        </>
      )}
    </Main>
  );
};

export default Dashboard;
