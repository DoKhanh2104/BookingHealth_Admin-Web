import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ModalAddTimeSlotProps {
  open: boolean;
  onClose: () => void;
  onAdd: (code: string, startTime: string, endTime: string) => boolean;
  t: (key: string) => string;
}

export default function ModalAddTimeSlot({ open, onClose, onAdd, t }: ModalAddTimeSlotProps) {
  const [code, setCode] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('08:30');
  const [error, setError] = useState('');

  const handleClose = () => {
    setCode('');
    setStartTime('08:00');
    setEndTime('08:30');
    setError('');
    onClose();
  };

  const handleSubmit = () => {
    setError('');

    if (!code.trim() || !startTime || !endTime) {
      setError(t('timeSlotConfig.modals.validation.required'));
      return;
    }

    if (startTime >= endTime) {
      setError(t('timeSlotConfig.modals.validation.timeCompare'));
      return;
    }

    const success = onAdd(code.trim(), startTime, endTime);
    if (success) {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1.5,
          boxShadow: '0 10px 40px 0 rgba(0,0,0,0.1)',
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
        {t('timeSlotConfig.modals.addTitle')}
        <IconButton aria-label="close" onClick={handleClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: 'none', borderBottom: 'none', px: 3, py: 2 }}>
        <Box display="flex" flexDirection="column" gap={2.5}>
          {error && (
            <Typography variant="body2" color="error" fontWeight={500}>
              {error}
            </Typography>
          )}

          <TextField
            label={t('timeSlotConfig.modals.code')}
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ví dụ: KG09"
            required
            autoFocus
          />

          <Box display="flex" gap={2}>
            <TextField
              label={t('timeSlotConfig.modals.startTime')}
              type="time"
              variant="outlined"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label={t('timeSlotConfig.modals.endTime')}
              type="time"
              variant="outlined"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
          {t('timeSlotConfig.modals.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          {t('timeSlotConfig.modals.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
