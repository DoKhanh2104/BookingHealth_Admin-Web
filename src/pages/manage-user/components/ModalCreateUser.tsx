import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Avatar,
  Slide,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import type { TransitionProps } from '@mui/material/transitions';
import { userService } from '../../../services/userService';
import type { CreateUserPayload } from '../ManageUser.types';
import { toast } from 'sonner';
import axios from 'axios';
import { useTranslation } from '../../../libs/i18n.hooks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalCreateUserProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface BackendErrorResponse {
  code?: string | number;
  message?: string;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ open, onClose, onSuccess }) => {
  const t = useTranslation('ManageUser');
  const [formData, setFormData] = useState<CreateUserPayload>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi khi người dùng bắt đầu nhập lại
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

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
    });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('name', formData.name);
      data.append('password', formData.password || '');

      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      await userService.createUser(data);
      toast.success(t('ModalCreate.messages.success'));
      resetForm();
      onSuccess();
      onClose();
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        toast.error(t('ModalCreate.messages.connectionError'));
        return;
      }

      const responseData = error.response?.data as BackendErrorResponse;
      const status = error.response?.status;

      if (status === 400 || status === 422) {
        const translatedErrors: Record<string, string> = {};

        if (Object.keys(translatedErrors).length === 0 && responseData?.message) {
          const msg = responseData.message;
          if (msg.includes('PASSWORD') || msg.includes('Mật khẩu')) translatedErrors.password = msg;
          else if (msg.includes('PHONE') || msg.includes('điện thoại'))
            translatedErrors.phone = msg;
          else if (msg.includes('EMAIL')) translatedErrors.email = msg;
          else if (msg.includes('NAME') || msg.includes('tên')) translatedErrors.name = msg;
        }

        if (Object.keys(translatedErrors).length > 0) {
          setErrors(translatedErrors);
          return;
        }

        if (responseData?.code === '1001' || responseData?.code === 1001) {
          toast.error(responseData?.message);
        }
      }
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
          {t('ModalCreate.title')}
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
            {t('ModalCreate.avatar.caption')}
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('ModalCreate.fields.name.label')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              placeholder={t('ModalCreate.fields.name.placeholder')}
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
              label={t('ModalCreate.fields.email.label')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('ModalCreate.fields.email.placeholder')}
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
              label={t('ModalCreate.fields.phone.label')}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('ModalCreate.fields.phone.placeholder')}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('ModalCreate.fields.password.label')}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('ModalCreate.fields.password.placeholder')}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}>
          {t('ModalCreate.buttons.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            px: 4,
            py: 1,
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            minWidth: 150,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              <span>{t('ModalCreate.buttons.processing')}</span>
            </Box>
          ) : (
            t('ModalCreate.buttons.submit')
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateUser;
