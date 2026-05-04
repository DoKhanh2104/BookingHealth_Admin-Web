import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Avatar,
  Slide,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import type { CreateUserPayload, UpdateUserPayload, User } from '../ManageUser.types';
import { useTranslation } from '../../../libs/i18n.hooks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalUpdateUserProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
  validateUser: (
    data: CreateUserPayload | UpdateUserPayload,
    type?: 'create' | 'update',
  ) => { isValid: boolean; errors: Record<string, string> };
  onUpdate: (
    id: number | string,
    data: UpdateUserPayload,
  ) => Promise<{ success: boolean; error?: Error }>;
}

interface BackendErrorResponse {
  code?: string | number;
  message?: string;
}

const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({
  open,
  onClose,
  user,
  validateUser,
  onUpdate,
}) => {
  const t = useTranslation('ManageUser');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || user?.phoneNumber || '',
    role: (user?.role || 'USER').toUpperCase(),
    status: (() => {
      const s = (user?.status ?? '').toString().toLowerCase();
      if (s === '1' || s === 'active') return 1;
      if (s === '2' || s === 'banned') return 2;
      return 0; // inactive
    })(),
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (loading || !user) return;

    const { isValid, errors: validationErrors } = validateUser(formData, 'update');
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('status', String(formData.status));

      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const result = await onUpdate(user.id, data as UpdateUserPayload);

      if (!result.success) {
        const error = result.error;
        if (axios.isAxiosError(error)) {
          const responseData = error.response?.data as BackendErrorResponse;
          if (responseData?.message) {
            const msg = responseData.message;
            const translatedErrors: Record<string, string> = {};
            if (msg.includes('EMAIL')) translatedErrors.email = msg;
            else if (msg.includes('NAME')) translatedErrors.name = msg;

            if (Object.keys(translatedErrors).length > 0) {
              setErrors(translatedErrors);
            } else {
              toast.error(msg);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Có lỗi xảy ra khi cập nhật!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' },
      }}
    >
      <DialogTitle
        sx={{ p: 3, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
          {t('ModalUpdate.title')}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={avatarPreview || ''}
              sx={{
                width: 100,
                height: 100,
                border: '4px solid',
                borderColor: 'primary.light',
                mb: 1,
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              sx={{
                position: 'absolute',
                bottom: 5,
                right: -5,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                boxShadow: 2,
              }}
              size="small"
            >
              <CloudUploadIcon fontSize="small" />
            </IconButton>
          </Box>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Typography variant="caption" color="text.secondary">
            {t('ModalUpdate.avatar.caption')}
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('ModalUpdate.fields.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('ModalUpdate.fields.email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('ModalUpdate.fields.phone')}
              name="phone"
              value={formData.phone}
              disabled
              sx={{ bgcolor: 'action.hover' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label={t('ModalUpdate.fields.role.label')}
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={formData.role === 'ADMIN'}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: (theme) => theme.palette.text.primary,
                  bgcolor: 'action.hover',
                },
              }}
            >
              <MenuItem value="USER">{t('ModalUpdate.fields.role.user')}</MenuItem>
              <MenuItem value="DOCTOR">{t('ModalUpdate.fields.role.doctor')}</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label={t('ModalUpdate.fields.status.label')}
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value={1}>{t('ModalUpdate.fields.status.active')}</MenuItem>
              <MenuItem value={0}>{t('ModalUpdate.fields.status.inactive')}</MenuItem>
              <MenuItem value={2}>{t('ModalUpdate.fields.status.banned')}</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}>
          {t('ModalUpdate.buttons.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            px: 4,
            py: 1,
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
          disabled={loading}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              <span>{t('ModalCreate.buttons.processing') || 'Đang xử lý...'}</span>
            </Box>
          ) : (
            t('ModalUpdate.buttons.submit')
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateUser;
