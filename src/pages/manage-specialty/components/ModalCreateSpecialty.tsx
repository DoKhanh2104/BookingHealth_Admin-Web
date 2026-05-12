import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useTranslation } from '../../../libs/i18n.hooks';
import type { SpecialtyRequestPayload } from '../ManageSpecialty.types';

interface ModalCreateSpecialtyProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: SpecialtyRequestPayload) => void;
}

const ModalCreateSpecialty = ({ open, onClose, onConfirm }: ModalCreateSpecialtyProps) => {
  const t = useTranslation('ManageSpecialty');
  const [formData, setFormData] = useState<SpecialtyRequestPayload>({
    specialtyName: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' && error) setError('');
  };

  const handleConfirm = () => {
    if (!formData.specialtyName.trim()) {
      setError(t('validation.nameRequired'));
      return;
    }
    onConfirm(formData);
    // Reset form after submit
    setFormData({ specialtyName: '', description: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{t('modals.createTitle')}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('columns.name')}
            name="specialtyName"
            value={formData.specialtyName}
            onChange={handleChange}
            fullWidth
            required
            error={!!error}
            helperText={error}
          />
          <TextField
            label={t('columns.description')}
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          {t('buttons.cancel')}
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          {t('buttons.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateSpecialty;
