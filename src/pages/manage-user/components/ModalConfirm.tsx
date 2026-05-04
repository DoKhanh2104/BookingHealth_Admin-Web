import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  loading = false,
  color = 'error',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 1,
          minWidth: 360,
        },
      }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: `${color}.lighter`,
            color: `${color}.main`,
          }}
        >
          <WarningIcon />
        </Box>
        <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <DialogContentText id="confirm-dialog-description" sx={{ color: 'text.secondary' }}>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button onClick={onClose} color="inherit" variant="text" disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={color}
          variant="contained"
          autoFocus
          disabled={loading}
          sx={{
            px: 3,
          }}
        >
          {loading ? 'Đang xử lý...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirm;
