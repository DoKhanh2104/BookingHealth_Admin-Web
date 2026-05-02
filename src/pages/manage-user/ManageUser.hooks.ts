import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { ChipColor, User } from './ManageUser.types';
import { userService } from '../../services/userService';

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
      const userName = removeAccents((user.name || '').toLowerCase());
      const userEmail = (user.email || '').toLowerCase();
      const userPhone = user.phone || '';

      const matchesSearch =
        !search ||
        userName.includes(search) ||
        userEmail.includes(search) ||
        userPhone.includes(search);

      const matchesStatus =
        filter === 'all' || (user.status || '').toString().toLowerCase() === filter;

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
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role?: string): ChipColor => {
    if (!role) return 'default';
    const roleStr = role.toString().toLowerCase();
    switch (roleStr) {
      case 'admin':
        return 'primary';
      case 'doctor':
        return 'secondary';
      case 'user':
        return 'info';
      default:
        return 'default';
    }
  };

  const filterOptions = [
    { value: 'all', label: t('filterOptions.all') },
    { value: 'active', label: t('filterOptions.active') },
    { value: 'inactive', label: t('filterOptions.inactive') },
    { value: 'banned', label: t('filterOptions.banned') },
  ];

  return {
    t,
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
    selectedUser,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleCloseModals,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
    handleFilterChange,
    handleClear,
    getStatusColor,
    getRoleColor,
    refreshUsers: fetchUsers,
  };
};
