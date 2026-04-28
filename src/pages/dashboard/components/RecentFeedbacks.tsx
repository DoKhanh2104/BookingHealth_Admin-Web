import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Typography,
  Rating,
  Button,
  useTheme,
} from '@mui/material';
import { getDashboardCardSx } from './DashboardStyles';
import { type DashboardHooksType, type RecentFeedback } from '../Dashboard.types';

export const RecentFeedbacks = ({ tDashboard, recentFeedbacks }: DashboardHooksType) => {
  const theme = useTheme();

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('feedbacks.title')}
        titleTypographyProps={{ fontWeight: 700 }}
        sx={{ px: 4, color: theme.palette.text.primary }}
      />
      <Divider />
      <CardContent sx={{ pt: 1 }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {recentFeedbacks.map((feedback: RecentFeedback) => (
            <ListItem
              key={feedback.id}
              alignItems="flex-start"
              sx={{ mb: 1, borderBottom: `1px dashed ${theme.palette.divider}`, pb: 2 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.error.light }}>
                  {feedback.patientName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                      {feedback.patientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {feedback.date}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Stack spacing={0.5} mt={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Rating value={feedback.rating} readOnly size="small" max={5} />
                      <Typography variant="caption" fontWeight="bold" color="error.main">
                        {feedback.doctorName}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic', mt: 0.5 }}
                    >
                      "{feedback.comment}"
                    </Typography>
                    <Stack direction="row" justifyContent="flex-end" mt={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        disableElevation
                        sx={{ textTransform: 'none', borderRadius: 2, px: 2 }}
                      >
                        {tDashboard('feedbacks.resolve')}
                      </Button>
                    </Stack>
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
