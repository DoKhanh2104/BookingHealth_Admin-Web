import { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  EventNote as BookingIcon,
  CheckCircle as SuccessIcon,
  CancelOutlined as CancelIcon,
  ReportProblemOutlined as AlertIcon,
} from '@mui/icons-material';
import type { Patient, PatientAppointment } from '../ManagePatient.types';

interface ModalPatientHistoryProps {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
  appointments: PatientAppointment[];
  t: (key: string, args?: object | Array<string | number>) => string;
  loading?: boolean;
}

export default function ModalPatientHistory({
  open,
  onClose,
  patient,
  appointments,
  t,
  loading,
}: ModalPatientHistoryProps) {
  // Calculate statistics for bùng lịch / spam tracking
  const stats = useMemo(() => {
    const total = appointments.length;
    const completed = appointments.filter((a) => a.status === 'COMPLETED').length;
    const cancelled = appointments.filter((a) => a.status === 'CANCELLED').length;
    const noShow = appointments.filter((a) => a.status === 'NO_SHOW').length;

    return { total, completed, cancelled, noShow };
  }, [appointments]);

  if (!patient) return null;

  // Color-coded chips for status
  const renderStatusChip = (status: PatientAppointment['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Chip
            label={t(`historyModal.status.COMPLETED`)}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'CONFIRMED':
        return (
          <Chip
            label={t(`historyModal.status.CONFIRMED`)}
            color="info"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'PENDING':
        return (
          <Chip
            label={t(`historyModal.status.PENDING`)}
            color="warning"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            label={t(`historyModal.status.CANCELLED`)}
            color="default"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'NO_SHOW':
        return (
          <Chip
            label={t(`historyModal.status.NO_SHOW`)}
            color="error"
            size="small"
            sx={{
              fontWeight: 700,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: 'error.dark',
              border: '1px solid rgba(211, 47, 47, 0.3)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontWeight: 700,
          color: 'primary.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {t('historyModal.title', { name: patient.fullName })}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2.5, borderTop: 'none', borderBottom: 'none' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={8}>
            <LinearProgress sx={{ width: '60%' }} />
          </Box>
        ) : (
          <>
            {/* Metric Cards Grid for Anti-Spam Detection */}
        <Grid container spacing={2} mb={3.5}>
          {/* Card 1: Total Booked */}
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2.5,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                  color: 'primary.main',
                }}
              >
                <BookingIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {t('historyModal.stats.total')}
                </Typography>
                <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mt: -0.5 }}>
                  {stats.total}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 2: Completed */}
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2.5,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(46, 125, 50, 0.08)',
                  color: 'success.main',
                }}
              >
                <SuccessIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {t('historyModal.stats.completed')}
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main" sx={{ mt: -0.5 }}>
                  {stats.completed}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 3: Cancelled */}
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2.5,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(158, 158, 158, 0.08)',
                  color: 'text.secondary',
                }}
              >
                <CancelIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {t('historyModal.stats.cancelled')}
                </Typography>
                <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mt: -0.5 }}>
                  {stats.cancelled}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 4: No-Show/Bùng hẹn (Red alert card!) */}
          <Grid item xs={6} sm={3}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2.5,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: stats.noShow > 1 ? 'error.light' : 'divider',
                backgroundColor: stats.noShow > 1 ? 'rgba(211, 47, 47, 0.02)' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: stats.noShow > 1 ? 'rgba(211, 47, 47, 0.12)' : 'rgba(211, 47, 47, 0.08)',
                  color: 'error.main',
                }}
              >
                <AlertIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color={stats.noShow > 1 ? 'error.main' : 'text.secondary'}
                  fontWeight={600}
                >
                  {t('historyModal.stats.noShow')}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="error.main"
                  sx={{ mt: -0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  {stats.noShow}
                  {stats.noShow > 1 && (
                    <Typography
                      variant="caption"
                      component="span"
                      fontWeight={600}
                      sx={{ fontStyle: 'italic' }}
                    >
                      (Spam flag!)
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* History Booking Logs Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
        >
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                  {t('historyModal.table.stt')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 150 }}>
                  {t('historyModal.table.doctor')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 200 }}>
                  {t('historyModal.table.clinic')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 180 }}>
                  {t('historyModal.table.dateTime')}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: 'primary.main', width: 140, textAlign: 'center' }}
                >
                  {t('historyModal.table.status')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt, idx) => (
                <TableRow key={appt.id} hover>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{appt.doctorName}</TableCell>
                  <TableCell>{appt.clinicName}</TableCell>
                  <TableCell>{`${appt.date} | ${appt.timeSlot}`}</TableCell>
                  <TableCell align="center">{renderStatusChip(appt.status)}</TableCell>
                </TableRow>
              ))}
              {appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    {t('noData')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
          {t('historyModal.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
