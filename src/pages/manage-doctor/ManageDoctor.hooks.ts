import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '../../libs/i18n.hooks';
import { doctorService } from '../../services/doctorService';
import type { Doctor } from './ManageDoctor.types';

export const useManageDoctorHooks = () => {
  const t = useTranslation('ManageDoctor');

  // State quản lý danh sách và phân trang, tìm kiếm
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  // State quản lý Modal
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openLock, setOpenLock] = useState(false);

  // State chứa dữ liệu đang thao tác
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Fetch danh sách bác sĩ
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const data = await doctorService.getAll(page, rowsPerPage, '');
      if (data?.result) {
        setDoctors(data.result.content || []);
        setTotalElements(data.result.totalElements || 0);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bác sĩ:', error);
      toast.error(t('messages.fetchError'));
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, t]);

  useEffect(() => {
    Promise.resolve().then(() => fetchDoctors());
  }, [fetchDoctors]);

  // Search handlers
  // Helper to remove Vietnamese accents
  const removeAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const filteredDoctors = useMemo(() => {
    if (!keyword.trim()) return doctors;
    const search = removeAccents(keyword.trim().toLowerCase());
    return doctors.filter((d) => {
      const name = removeAccents((d.fullName || '').toLowerCase());
      return name.includes(search);
    });
  }, [doctors, keyword]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClearSearch = () => {
    setKeyword('');
  };

  // Phân trang
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle Modals
  const handleOpenDetail = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setSelectedDoctor(null);
    setOpenDetail(false);
  };

  const handleOpenDelete = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setSelectedDoctor(null);
    setOpenDelete(false);
  };

  const handleOpenApprove = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenApprove(true);
  };
  const handleCloseApprove = () => {
    setSelectedDoctor(null);
    setOpenApprove(false);
  };

  const handleOpenReject = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenReject(true);
  };
  const handleCloseReject = () => {
    setSelectedDoctor(null);
    setOpenReject(false);
  };

  const handleOpenLock = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenLock(true);
  };
  const handleCloseLock = () => {
    setSelectedDoctor(null);
    setOpenLock(false);
  };

  // Actions
  const handleApprove = async () => {
    if (!selectedDoctor) return;
    try {
      await doctorService.approve(selectedDoctor.id);
      toast.success(t('messages.approveSuccess'));
      handleCloseApprove();
      fetchDoctors();
    } catch (error) {
      console.error('Lỗi duyệt bác sĩ:', error);
      toast.error(t('messages.approveError'));
    }
  };

  const handleReject = async () => {
    if (!selectedDoctor) return;
    try {
      await doctorService.reject(selectedDoctor.id);
      toast.success(t('messages.rejectSuccess'));
      handleCloseReject();
      fetchDoctors();
    } catch (error) {
      console.error('Lỗi từ chối bác sĩ:', error);
      toast.error(t('messages.rejectError'));
    }
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;
    try {
      await doctorService.delete(selectedDoctor.id);
      toast.success(t('messages.deleteSuccess'));
      handleCloseDelete();
      if (doctors.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchDoctors();
      }
    } catch (error) {
      console.error('Lỗi xóa bác sĩ:', error);
      toast.error(t('messages.deleteError'));
    }
  };

  const handleLock = async () => {
    if (!selectedDoctor) return;
    try {
      await doctorService.lock(selectedDoctor.id);
      toast.success(t('messages.lockSuccess'));
      handleCloseLock();
      fetchDoctors();
    } catch (error) {
      console.error('Lỗi khóa tài khoản bác sĩ:', error);
      toast.error(t('messages.lockError'));
    }
  };

  return {
    t,
    doctors: filteredDoctors,
    loading,
    page,
    rowsPerPage,
    totalElements,
    keyword,
    handleSearchChange,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    // Modals
    openDetail,
    openDelete,
    openApprove,
    openReject,
    openLock,
    selectedDoctor,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenApprove,
    handleCloseApprove,
    handleOpenReject,
    handleCloseReject,
    handleOpenLock,
    handleCloseLock,
    // Actions
    handleApprove,
    handleReject,
    handleDelete,
    handleLock,
  };
};
