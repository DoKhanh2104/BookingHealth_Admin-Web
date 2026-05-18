import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { toast } from 'sonner';
import { clinicService } from '../../../services/clinicService';
import { useTranslation } from '../../../libs/i18n.hooks';
import type { Clinic, ClinicRequestPayload } from '../ManageClinic.types';

interface ModalUpdateClinicProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: ClinicRequestPayload) => void;
  clinic: Clinic | null;
}

const ModalUpdateClinic = ({ open, onClose, onConfirm, clinic }: ModalUpdateClinicProps) => {
  const t = useTranslation('ManageClinic');
  const [formData, setFormData] = useState<ClinicRequestPayload>({
    name: clinic?.clinicName || '',
    address: clinic?.address || '',
    longitude: clinic?.longitude,
    latitude: clinic?.latitude,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingGeo, setLoadingGeo] = useState(false);

  const handleGetGeocoding = async () => {
    if (!formData.address.trim()) return;
    try {
      setLoadingGeo(true);
      const data = await clinicService.getGeocoding(formData.address);
      const lon = data?.result?.longitude ?? data?.longitude;
      const lat = data?.result?.latitude ?? data?.latitude;

      if (lon !== undefined && lat !== undefined) {
        setFormData((prev) => ({ ...prev, longitude: lon, latitude: lat }));
        setErrors((prev) => ({ ...prev, longitude: '', latitude: '' }));
        toast.success('Lấy tọa độ thành công');
      } else {
        toast.error('Không tìm thấy tọa độ cho địa chỉ này');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Lỗi khi lấy tọa độ');
    } finally {
      setLoadingGeo(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'longitude' || name === 'latitude') {
      const parsedValue = value === '' ? undefined : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleConfirm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.nameRequired');
    if (!formData.address.trim()) newErrors.address = t('validation.addressRequired');
    if (formData.longitude === undefined) newErrors.longitude = t('validation.coordinatesRequired');
    if (formData.latitude === undefined) newErrors.latitude = t('validation.coordinatesRequired');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onConfirm(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{t('modals.updateTitle')}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('columns.name')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label={t('columns.address')}
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.address}
            helperText={errors.address}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleGetGeocoding}
                    edge="end"
                    disabled={loadingGeo || !formData.address.trim()}
                    title="Tìm tọa độ"
                  >
                    {loadingGeo ? <CircularProgress size={24} /> : <SearchIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label={t('columns.longitude')}
              name="longitude"
              type="number"
              value={formData.longitude !== undefined ? formData.longitude : ''}
              onChange={handleChange}
              fullWidth
              disabled
              required
              error={!!errors.longitude}
              helperText={errors.longitude}
            />
            <TextField
              label={t('columns.latitude')}
              name="latitude"
              type="number"
              value={formData.latitude !== undefined ? formData.latitude : ''}
              onChange={handleChange}
              fullWidth
              disabled
              required
              error={!!errors.latitude}
              helperText={errors.latitude}
            />
          </Box>
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

export default ModalUpdateClinic;
