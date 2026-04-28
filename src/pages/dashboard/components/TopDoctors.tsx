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
  Chip,
  Rating,
  useTheme,
} from '@mui/material';
import { getDashboardCardSx } from './DashboardStyles';
import { type DashboardHooksType, type TopDoctor } from '../Dashboard.types';

export const TopDoctors = ({ tDashboard, topDoctors }: DashboardHooksType) => {
  const theme = useTheme();

  return (
    <Card sx={getDashboardCardSx(theme)}>
      <CardHeader
        title={tDashboard('topDoctors.title')}
        titleTypographyProps={{ fontWeight: 700 }}
        sx={{ px: 4, color: theme.palette.text.primary }}
      />
      <Divider />
      <CardContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {topDoctors.map((doctor: TopDoctor, index: number) => (
            <ListItem key={index} alignItems="flex-start" sx={{ mb: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.primary.light }}>{doctor.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                      {doctor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doctor.bookings} {tDashboard('topDoctors.visits')}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Chip
                      label={doctor.spec}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                    <Rating value={doctor.rating} readOnly size="small" precision={0.1} />
                    <Typography variant="caption" fontWeight="bold">
                      {doctor.rating}
                    </Typography>
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
