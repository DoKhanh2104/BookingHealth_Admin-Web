import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '../../libs/i18n.hooks';
import { specialtyService } from '../../services/specialtyService';
import type { Specialty, SpecialtyRequestPayload } from './ManageSpecialty.types';

export const useManageSpecialtyHooks = () => {
  const t = useTranslation('ManageSpecialty');

  // State quản lý danh sách và phân trang
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);

  // State quản lý Modal
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // State chứa dữ liệu đang thao tác
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  // Fetch danh sách chuyên khoa
  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const data = await specialtyService.getAll(page, rowsPerPage);
      // Giả sử backend trả về ApiResponse<Page<Specialty>> => data.result.content
      if (data?.result) {
        setSpecialties(data.result.content || []);
        setTotalElements(data.result.totalElements || 0);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
      toast.error(t('messages.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchSpecialties());
  }, [page, rowsPerPage]);

  // Phân trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle Modals
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenUpdate = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setSelectedSpecialty(null);
    setOpenUpdate(false);
  };

  const handleOpenDelete = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setSelectedSpecialty(null);
    setOpenDelete(false);
  };

  // Thao tác Create/Update/Delete
  const handleCreate = async (payload: SpecialtyRequestPayload) => {
    try {
      await specialtyService.create(payload);
      toast.success(t('messages.createSuccess'));
      handleCloseCreate();
      fetchSpecialties();
    } catch (error) {
      console.error('Lỗi tạo chuyên khoa:', error);
      toast.error(t('messages.createError'));
    }
  };

  const handleUpdate = async (payload: SpecialtyRequestPayload) => {
    if (!selectedSpecialty) return;
    try {
      await specialtyService.update(selectedSpecialty.id, payload);
      toast.success(t('messages.updateSuccess'));
      handleCloseUpdate();
      fetchSpecialties();
    } catch (error) {
      console.error('Lỗi cập nhật chuyên khoa:', error);
      toast.error(t('messages.updateError'));
    }
  };

  const handleDelete = async () => {
    if (!selectedSpecialty) return;
    try {
      await specialtyService.delete(selectedSpecialty.id);
      toast.success(t('messages.deleteSuccess'));
      handleCloseDelete();
      // Nếu xóa item cuối cùng ở trang hiện tại, lùi lại 1 trang
      if (specialties.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchSpecialties();
      }
    } catch (error) {
      console.error('Lỗi xóa chuyên khoa:', error);
      toast.error(t('messages.deleteError'));
    }
  };

  return {
    t,
    specialties,
    loading,
    page,
    rowsPerPage,
    totalElements,
    handleChangePage,
    handleChangeRowsPerPage,
    // Modals
    openCreate,
    openUpdate,
    openDelete,
    selectedSpecialty,
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
