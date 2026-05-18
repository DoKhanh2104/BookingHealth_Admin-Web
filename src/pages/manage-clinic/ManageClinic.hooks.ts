import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '../../libs/i18n.hooks';
import { clinicService } from '../../services/clinicService';
import type { Clinic, ClinicRequestPayload } from './ManageClinic.types';

export const useManageClinicHooks = () => {
  const t = useTranslation('ManageClinic');

  // State quản lý danh sách và phân trang, tìm kiếm
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  // State quản lý Modal
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // State chứa dữ liệu đang thao tác
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  // Fetch danh sách phòng khám
  const fetchClinics = useCallback(async () => {
    try {
      setLoading(true);
      // We pass an empty string for keyword to fetch all for the current page
      const data = await clinicService.getAll(page, rowsPerPage, '');
      // Giả sử backend trả về ApiResponse<Page<Clinic>> => data.result.content
      if (data?.result) {
        setClinics(data.result.content || []);
        setTotalElements(data.result.totalElements || 0);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng khám:', error);
      toast.error(t('messages.fetchError'));
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, t]);

  useEffect(() => {
    Promise.resolve().then(() => fetchClinics());
  }, [fetchClinics]);

  // Helper to remove Vietnamese accents
  const removeAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const filteredClinics = useMemo(() => {
    if (!keyword.trim()) return clinics;
    const search = removeAccents(keyword.trim().toLowerCase());
    return clinics.filter((c) => {
      const name = removeAccents((c.clinicName || '').toLowerCase());
      return name.includes(search);
    });
  }, [clinics, keyword]);

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
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenUpdate = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setSelectedClinic(null);
    setOpenUpdate(false);
  };

  const handleOpenDelete = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setSelectedClinic(null);
    setOpenDelete(false);
  };

  // Thao tác Create/Update/Delete
  const handleCreate = async (payload: ClinicRequestPayload) => {
    try {
      await clinicService.create(payload);
      toast.success(t('messages.createSuccess'));
      handleCloseCreate();
      fetchClinics();
    } catch (error) {
      console.error('Lỗi tạo phòng khám:', error);
      toast.error(t('messages.createError'));
    }
  };

  const handleUpdate = async (payload: ClinicRequestPayload) => {
    if (!selectedClinic) return;
    try {
      await clinicService.update(selectedClinic.id, payload);
      toast.success(t('messages.updateSuccess'));
      handleCloseUpdate();
      fetchClinics();
    } catch (error) {
      console.error('Lỗi cập nhật phòng khám:', error);
      toast.error(t('messages.updateError'));
    }
  };

  const handleDelete = async () => {
    if (!selectedClinic) return;
    try {
      await clinicService.delete(selectedClinic.id);
      toast.success(t('messages.deleteSuccess'));
      handleCloseDelete();
      if (clinics.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchClinics();
      }
    } catch (error) {
      console.error('Lỗi xóa phòng khám:', error);
      toast.error(t('messages.deleteError'));
    }
  };

  return {
    t,
    clinics: filteredClinics,
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
    openCreate,
    openUpdate,
    openDelete,
    selectedClinic,
    handleOpenCreate,
    handleCloseCreate,
    handleOpenUpdate,
    handleCloseUpdate,
    handleOpenDelete,
    handleCloseDelete,
    // Actions
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
