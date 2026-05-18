import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  Verified as VerifiedIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from '@mui/icons-material';
import type { Doctor } from '../ManageDoctor.types';

interface ModalDoctorDetailProps {
  open: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  t: (key: string) => string;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={4}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography variant="body2">{value || '-'}</Typography>
    </Grid>
  </Grid>
);

const ModalDoctorDetail: React.FC<ModalDoctorDetailProps> = ({ open, onClose, doctor, t }) => {
  if (!doctor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffffff 10%, #42a5f5 80%)',
          py: 3,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={doctor.avatar}
          alt={doctor.fullName}
          sx={{
            width: 72,
            height: 72,
            border: '3px solid rgba(3, 3, 3, 0.1)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#000000', fontWeight: 700 }}>
            {doctor.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.85)', mt: 0.5 }}>
            {doctor.specialty}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              icon={
                doctor.status === 'VERIFIED' ? (
                  <VerifiedIcon sx={{ fontSize: 16 }} />
                ) : (
                  <HourglassEmptyIcon sx={{ fontSize: 16 }} />
                )
              }
              label={doctor.status === 'VERIFIED' ? t('status.verified') : t('status.pending')}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: 12,
                bgcolor:
                  doctor.status === 'VERIFIED'
                    ? 'rgba(46, 125, 50, 0.9)'
                    : 'rgba(237, 108, 2, 0.9)',
                color: '#fff',
                '& .MuiChip-icon': { color: '#fff' },
              }}
            />
          </Box>
        </Box>
      </Box>

      <DialogTitle sx={{ pt: 2.5, pb: 1, fontWeight: 700 }}>{t('modals.detailTitle')}</DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        <Divider sx={{ mb: 2 }} />

        <DetailRow label={t('detail.fullName')} value={doctor.fullName} />
        <DetailRow label={t('detail.email')} value={doctor.email} />
        <DetailRow label={t('detail.phone')} value={doctor.phone} />
        <DetailRow label={t('detail.specialty')} value={doctor.specialty} />
        <DetailRow label={t('detail.clinic')} value={doctor.clinicName} />
        <DetailRow label={t('detail.licenseNumber')} value={doctor.licenseNumber} />
        <DetailRow
          label={t('detail.status')}
          value={
            <Chip
              size="small"
              label={doctor.status === 'VERIFIED' ? t('status.verified') : t('status.pending')}
              sx={{
                fontWeight: 600,
                bgcolor:
                  doctor.status === 'VERIFIED'
                    ? 'rgba(46, 125, 50, 0.1)'
                    : 'rgba(237, 108, 2, 0.1)',
                color: doctor.status === 'VERIFIED' ? '#2e7d32' : '#ed6c02',
              }}
            />
          }
        />

        <DetailRow
          label={t('detail.createdAt')}
          value={doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString('vi-VN') : '-'}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<CloseIcon />}
          sx={{ borderRadius: 2 }}
        >
          {t('buttons.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDoctorDetail;
