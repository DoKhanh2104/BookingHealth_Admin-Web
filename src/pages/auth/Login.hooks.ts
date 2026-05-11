import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from '../../libs/i18n.hooks';
import { authService, type LoginPayload } from '../../services/authService';
import { TOKEN_KEY } from '../../api/apiClient';
import { parseJwt } from '../../utils/jwt';

export const useLoginHooks = () => {
  const t = useTranslation('Login');
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginPayload>({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username?.trim()) {
      newErrors.username = t('validation.usernameRequired');
    }
    if (!formData.password?.trim()) {
      newErrors.password = t('validation.passwordRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await authService.login(formData);

      // Kiểm tra API trả về thành công không (Backend của bạn dùng code: 1000)
      if (data?.code !== 1000 || !data?.result?.token) {
        throw new Error('Sai tài khoản hoặc mật khẩu');
      }

      const token = data.result.token;

      // Decode để kiểm tra quyền
      const decoded = parseJwt(token);
      if (!decoded || (decoded.scope !== 'ROLE_ADMIN' && decoded.scope !== 'ADMIN')) {
        toast.error('Tài khoản không có quyền truy cập quản trị!');
        return;
      }

      // Lưu token
      localStorage.setItem(TOKEN_KEY, token);

      // Báo cho AuthContext biết token đã thay đổi ngay lập tức
      window.dispatchEvent(new Event('storage'));

      toast.success(t('messages.success'));

      // Chuyển hướng vào trang admin
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('messages.error'));
    } finally {
      setLoading(false);
    }
  };

  return {
    t,
    formData,
    loading,
    errors,
    showPassword,
    handleChange,
    handleTogglePassword,
    handleLogin,
  };
};
