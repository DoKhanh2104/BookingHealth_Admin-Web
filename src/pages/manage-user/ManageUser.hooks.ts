import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { ChipColor, CreateUserPayload, UpdateUserPayload, User } from './ManageUser.types';
import { userService } from '../../services/userService';
import { toast } from 'sonner';

export const useManageUserHooks = () => {
  const t = useTranslation('ManageUser');

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const columns = [
    { field: 'id', headerName: t('columns.id'), width: 70 },
    { field: 'name', headerName: t('columns.name'), width: 200 },
    { field: 'email', headerName: t('columns.email'), width: 200 },
    { field: 'phoneNumber', headerName: t('columns.phoneNumber'), width: 150 },
    { field: 'role', headerName: t('columns.role'), width: 120 },
    { field: 'status', headerName: t('columns.status'), width: 120 },
    { field: 'actions', headerName: t('columns.actions'), width: 100 },
  ];

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await userService.getUsers({
        page: 0,
        size: 200,
      });
      setAllUsers(result.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateUser = async (id: number | string, data: UpdateUserPayload) => {
    try {
      await userService.updateUser(id, data);
      toast.success(t('ModalUpdate.messages.success') || 'Cập nhật thành công!');
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
      return { success: true };
    } catch (error) {
      console.error('Failed to update user:', error);
      return { success: false, error: error as Error };
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchUsers());
  }, [fetchUsers]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);

  const handleOpenUpdateModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  // Helper to remove Vietnamese accents
  const removeAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  // Handle FE Filtering and Searching
  const filteredUsers = useMemo(() => {
    const search = removeAccents(searchQuery.trim().toLowerCase());
    const filter = statusFilter.toLowerCase();

    return allUsers.filter((user) => {
      // Không hiển thị Admin trong danh sách quản lý người dùng
      if (user.role === 'ADMIN') return false;

      const userName = removeAccents((user.name || '').toLowerCase());
      const userEmail = (user.email || '').toLowerCase();
      const userPhone = user.phone || '';

      const matchesSearch =
        !search ||
        userName.includes(search) ||
        userEmail.includes(search) ||
        userPhone.includes(search);

      const matchesStatus =
        filter === 'all' ||
        (user.status || '').toString().toLowerCase() === filter ||
        (filter === '1' && (user.status || '').toString().toLowerCase() === 'active') ||
        (filter === '0' && (user.status || '').toString().toLowerCase() === 'inactive') ||
        (filter === '2' && (user.status || '').toString().toLowerCase() === 'banned');

      return matchesSearch && matchesStatus;
    });
  }, [allUsers, searchQuery, statusFilter]);

  // Handle FE Pagination
  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(0);
  };

  const handleClear = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPage(0);
  };

  const getStatusColor = (status: string | number): ChipColor => {
    if (status === undefined || status === null) return 'default';
    const statusStr = status.toString().toLowerCase();
    switch (statusStr) {
      case 'active':
      case '1':
        return 'success';
      case 'inactive':
      case '0':
        return 'warning';
      case 'banned':
      case '2':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string | number): string => {
    if (status === undefined || status === null) return '';
    const statusStr = status.toString().toLowerCase();
    switch (statusStr) {
      case 'active':
      case '1':
        return t('filterOptions.active');
      case 'inactive':
      case '0':
        return t('filterOptions.inactive');
      case 'banned':
      case '2':
        return t('filterOptions.banned');
      default:
        return status.toString();
    }
  };

  const getRoleLabel = (role?: string | number): string => {
    if (!role) return 'N/A';
    const roleStr = role.toString().toUpperCase();
    switch (roleStr) {
      case 'ADMIN':
      case '1':
        return t('ModalUpdate.fields.role.admin');
      case 'DOCTOR':
      case '3':
        return t('ModalUpdate.fields.role.doctor');
      case 'USER':
      case '2':
        return t('ModalUpdate.fields.role.user');
      default:
        return role.toString();
    }
  };

  const getRoleColor = (role?: string | number): ChipColor => {
    if (!role) return 'default';
    const roleStr = role.toString().toLowerCase();
    switch (roleStr) {
      case 'admin':
      case '1':
        return 'primary';
      case 'doctor':
      case '3':
        return 'secondary';
      case 'user':
      case '2':
        return 'info';
      default:
        return 'default';
    }
  };

  const filterOptions = [
    { value: 'all', label: t('filterOptions.all') },
    { value: '1', label: t('filterOptions.active') },
    { value: '0', label: t('filterOptions.inactive') },
    { value: '2', label: t('filterOptions.banned') },
  ];

  const validateUser = (
    data: CreateUserPayload | UpdateUserPayload,
    type: 'create' | 'update' = 'create',
  ) => {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = t('ModalCreate.messages.validation.nameRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email?.trim()) {
      errors.email = t('ModalCreate.messages.validation.emailRequired');
    } else if (!emailRegex.test(data.email)) {
      errors.email = t('ModalCreate.messages.validation.emailInvalid');
    }

    if (!data.phone?.trim()) {
      errors.phone = t('ModalCreate.messages.validation.phoneRequired');
    } else if (data.phone.length < 10 || data.phone.length > 11) {
      errors.phone = t('ModalCreate.messages.validation.phoneInvalid');
    }

    if (type === 'create') {
      const password = (data as CreateUserPayload).password || '';
      if (!password.trim()) {
        errors.password = t('ModalCreate.messages.validation.passwordRequired');
      } else if (password.length < 8) {
        errors.password = t('ModalCreate.messages.validation.passwordMin');
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToBan, setUserToBan] = useState<number | string | null>(null);

  const handleOpenConfirmModal = (id: number | string) => {
    setUserToBan(id);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setUserToBan(null);
  };

  const handleBanUser = async () => {
    if (!userToBan) return { success: false };
    try {
      await userService.deleteUser(userToBan);
      toast.success(t('ModalUpdate.messages.delete') || 'Tài khoản đã bị cấm khỏi hệ thống!');
      fetchUsers();
      handleCloseConfirmModal();
      return { success: true };
    } catch (error) {
      console.error('Failed to ban user:', error);
      return { success: false, error: error as Error };
    }
  };

  return {
    t,
    validateUser,
    columns,
    users: paginatedUsers,
    loading,
    total: filteredUsers.length,
    page,
    rowsPerPage,
    searchQuery,
    statusFilter,
    filterOptions,
    isCreateModalOpen,
    isUpdateModalOpen,
    isConfirmModalOpen,
    selectedUser,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleOpenConfirmModal,
    handleCloseModals,
    handleCloseConfirmModal,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
    handleFilterChange,
    handleClear,
    getStatusColor,
    getStatusLabel,
    getRoleColor,
    getRoleLabel,
    refreshUsers: fetchUsers,
    handleUpdateUser,
    handleBanUser,
  };
};
