import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Notification } from '../ManageNotification.types';

interface ModalCreateNotificationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  type: Notification['type'];
  setType: (val: Notification['type']) => void;
  target: Notification['target'];
  setTarget: (val: Notification['target']) => void;
  errors: { title?: string; content?: string };
  onSend: () => void;
  onDraft: () => void;
  t: (key: string, args?: object | Array<string | number>) => string;
}

export default function ModalCreateNotification({
  open,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  type,
  setType,
  target,
  setTarget,
  errors,
  onSend,
  onDraft,
  t,
}: ModalCreateNotificationProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        {t('createModal.title')}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2.5, borderTop: 'none', borderBottom: 'none' }}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Notification Title */}
          <TextField
            label={t('createModal.titleField')}
            placeholder={t('createModal.placeholders.title')}
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            required
            autoFocus
          />

          {/* Details / Content */}
          <TextField
            label={t('createModal.contentField')}
            placeholder={t('createModal.placeholders.content')}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!errors.content}
            helperText={errors.content}
            required
          />

          {/* Notification Type & Target Grid */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-type-label">{t('createModal.typeField')}</InputLabel>
                <Select
                  labelId="select-type-label"
                  label={t('createModal.typeField')}
                  value={type}
                  onChange={(e) => setType(e.target.value as Notification['type'])}
                >
                  <MenuItem value="SYSTEM">{t('types.SYSTEM')}</MenuItem>
                  <MenuItem value="PROMOTION">{t('types.PROMOTION')}</MenuItem>
                  <MenuItem value="MAINTENANCE">{t('types.MAINTENANCE')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-target-label">{t('createModal.targetField')}</InputLabel>
                <Select
                  labelId="select-target-label"
                  label={t('createModal.targetField')}
                  value={target}
                  onChange={(e) => setTarget(e.target.value as Notification['target'])}
                >
                  <MenuItem value="ALL">{t('targets.ALL')}</MenuItem>
                  <MenuItem value="DOCTOR">{t('targets.DOCTOR')}</MenuItem>
                  <MenuItem value="PATIENT">{t('targets.PATIENT')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          justifyContent: 'flex-end',
          gap: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2, px: 2.5 }}
        >
          {t('createModal.btnCancel')}
        </Button>
        <Button
          onClick={onDraft}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 2, px: 2.5 }}
        >
          {t('createModal.btnDraft')}
        </Button>
        <Button
          onClick={onSend}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 3 }}
        >
          {t('createModal.btnSend')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
