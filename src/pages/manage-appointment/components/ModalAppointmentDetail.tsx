import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { type Appointment } from '../ManageAppointment.types';
interface Props {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  t: (key: string) => string;
}

const ModalAppointmentDetail = ({ open, onClose, appointment, t }: Props) => {
  if (!appointment) return null;

  const renderStatusChip = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Chip label={t('status.PENDING')} color="warning" size="small" />;
      case 'CONFIRMED':
        return <Chip label={t('status.CONFIRMED')} color="info" size="small" />;
      case 'COMPLETED':
        return <Chip label={t('status.COMPLETED')} color="success" size="small" />;
      case 'CANCELLED':
        return <Chip label={t('status.CANCELLED')} color="error" size="small" />;
      default:
        return null;
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600}>
          {t('modals.detailTitle')} - #{appointment.id}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('detail.patientName')}
            </Typography>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {appointment.patientName}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
              {t('detail.patientPhone')}
            </Typography>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {appointment.patientPhone}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
              {t('detail.appointmentDate')} & {t('detail.timeSlot')}
            </Typography>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {appointment.appointmentDate} | {appointment.timeSlot}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('detail.doctorName')}
            </Typography>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {appointment.doctorName}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
              {t('detail.specialty')}
            </Typography>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              {appointment.specialty}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
              {t('detail.status')}
            </Typography>
            <Box mb={2}>{renderStatusChip(appointment.status)}</Box>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
              {t('detail.totalAmount')}
            </Typography>
            <Typography variant="body1" fontWeight={600} color="primary" gutterBottom>
              {appointment.totalAmount.toLocaleString('vi-VN')}đ
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Diagnosis and Prescription Section */}
          <Grid item xs={12}>
            {appointment.status === 'COMPLETED' ? (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {t('detail.diagnosis')}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ p: 1.5, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}
                >
                  {appointment.diagnosis || t('noDiagnosis')}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom mt={2}>
                  {t('detail.prescription')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(0,0,0,0.02)',
                    borderRadius: 1,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {appointment.prescription || t('noPrescription')}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {t('detail.diagnosis')} & {t('detail.prescription')}
                </Typography>
                <Typography variant="body2" color="text.disabled" fontStyle="italic">
                  {t('noDiagnosis')}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} color="inherit">
          {t('buttons.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAppointmentDetail;
