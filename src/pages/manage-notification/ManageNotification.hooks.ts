import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { Notification, CreateNotificationPayload } from './ManageNotification.types';
import { notificationService } from '../../services/notificationService';
import { toast } from 'sonner';

export const useManageNotificationHooks = () => {
  const t = useTranslation('ManageNotification');

  // Core Data States
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Create Modal & Form states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<number>(2); // Default to System (2)
  const [target, setTarget] = useState<string>('ALL');

  // Validation error states
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationService.getNotifications({
        page: page + 1, // backend is 0-indexed handled in service
        size: rowsPerPage,
        search: searchQuery || undefined,
      });
      setNotifications(response.data || []);
      setTotalNotifications(response.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi lấy dữ liệu thông báo.');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQuery]);

  useEffect(() => {
    Promise.resolve().then(fetchNotifications);
  }, [fetchNotifications]);

  const handleOpenCreate = () => {
    setOpenCreateModal(true);
    resetForm();
  };

  const handleCloseCreate = () => {
    setOpenCreateModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setType(2);
    setTarget('ALL');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) {
      newErrors.title = t('createModal.validation.titleRequired');
    }
    if (!content.trim()) {
      newErrors.content = t('createModal.validation.contentRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit and send notification to backend
  const handleSendNotification = async () => {
    if (!validateForm()) return;

    const payload: CreateNotificationPayload = {
      title: title.trim(),
      content: content.trim(),
      type,
      target,
    };

    setLoading(true);
    try {
      await notificationService.createNotification(payload);
      toast.success(
        t('messages.createSuccess', { title: payload.title }) || 'Gửi thông báo thành công',
      );
      handleCloseCreate();
      // Reload page 1
      setPage(0);
      fetchNotifications();
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi gửi thông báo.');
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const handleDeleteNotification = async (id: number) => {
    const isConfirmed = window.confirm(t('messages.confirmDelete') || 'Xóa thông báo này?');
    if (!isConfirmed) return;

    setLoading(true);
    try {
      await notificationService.deleteNotification(id);
      toast.success(t('messages.deleteSuccess') || 'Đã xóa thành công');
      fetchNotifications();
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi xóa.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    t,
    notifications,
    totalNotifications,
    searchQuery,
    setSearchQuery,
    loading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreateModal,
    handleOpenCreate,
    handleCloseCreate,
    title,
    setTitle,
    content,
    setContent,
    type,
    setType,
    target,
    setTarget,
    errors,
    handleSendNotification,
    handleDeleteNotification,
    refreshNotifications: fetchNotifications,
  };
};
