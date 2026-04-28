import {
  Card,
  CardHeader,
  Button,
  Divider,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import { getDashboardCardSx } from './DashboardStyles';
import { type DashboardHooksType, type PendingDoctor } from '../Dashboard.types';

export const PendingList = ({
  tDashboard,
  isPendingActionEmpty,
  pendingDoctors,
}: DashboardHooksType) => {
  const theme = useTheme();

  return (
    <Card sx={{ ...getDashboardCardSx(theme), overflow: 'hidden' }}>
      <CardHeader
        title={tDashboard('pending.title')}
        action={<Button color="primary">{tDashboard('pending.viewAll')}</Button>}
        titleTypographyProps={{ fontWeight: 700 }}
        sx={{ px: 4, color: theme.palette.text.primary }}
      />
      <Divider />
      {isPendingActionEmpty ? (
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            '&:last-child': { pb: 10 },
          }}
        >
          {tDashboard('pending.empty')}
        </CardContent>
      ) : (
        <TableContainer sx={{ px: 4, py: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>{tDashboard('table.index')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{tDashboard('table.doctorName')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{tDashboard('table.specialty')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  {tDashboard('table.registerDate')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{tDashboard('table.certificate')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  {tDashboard('table.action')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingDoctors.map((doctor: PendingDoctor, index: number) => (
                <TableRow
                  key={doctor.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{doctor.name}</Typography>
                  </TableCell>
                  <TableCell>{doctor.spec}</TableCell>
                  <TableCell>{doctor.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.certStatus}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1, textTransform: 'none', borderRadius: 2 }}
                    >
                      {tDashboard('action.approve')}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                      {tDashboard('action.reject')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};
