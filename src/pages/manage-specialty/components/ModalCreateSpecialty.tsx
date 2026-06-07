import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from '../../../libs/i18n.hooks';
import type { Specialty, SpecialtyRequestPayload } from '../ManageSpecialty.types';
import { specialtyService } from '../../../services/specialtyService';

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
  const [existingSpecialties, setExistingSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    if (open) {
      // Fetch specialties to provide suggestions and prevent duplicates
      specialtyService
        .getAll(0, 1000)
        .then((data) => {
          if (data?.result?.content) {
            setExistingSpecialties(data.result.content);
          }
        })
        .catch((err) => console.error('Error fetching specialties for autocomplete', err));
    }
  }, [open]);

  const handleClose = () => {
    setFormData({ specialtyName: '', description: '' });
    setError('');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'specialtyName' && error) setError('');
  };

  const handleAutocompleteChange = (
    _event: React.SyntheticEvent,
    newValue: string | Specialty | null,
  ) => {
    let newName = '';
    if (typeof newValue === 'string') {
      newName = newValue;
    } else if (newValue && newValue.specialtyName) {
      newName = newValue.specialtyName;
    }
    setFormData((prev) => ({ ...prev, specialtyName: newName }));
    if (error) setError('');
  };

  const handleConfirm = () => {
    const trimmedName = formData.specialtyName.trim();
    if (!trimmedName) {
      setError(t('validation.nameRequired'));
      return;
    }

    // Check for duplicates
    const isDuplicate = existingSpecialties.some(
      (s) => s.specialtyName.trim().toLowerCase() === trimmedName.toLowerCase(),
    );
    if (isDuplicate) {
      setError('Chuyên khoa này đã tồn tại');
      return;
    }

    onConfirm({ ...formData, specialtyName: trimmedName });
    // Reset state since modal will be closed by parent on success
    setFormData({ specialtyName: '', description: '' });
    setError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{t('modals.createTitle')}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Autocomplete
            freeSolo
            options={existingSpecialties}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.specialtyName
            }
            inputValue={formData.specialtyName}
            onInputChange={(_event, newInputValue) => {
              setFormData((prev) => ({ ...prev, specialtyName: newInputValue }));
              if (error) setError('');
            }}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('columns.name')}
                name="specialtyName"
                required
                error={!!error}
                helperText={error}
              />
            )}
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
        <Button onClick={handleClose} color="inherit">
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
