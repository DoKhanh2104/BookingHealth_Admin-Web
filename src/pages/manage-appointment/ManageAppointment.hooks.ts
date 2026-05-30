import { useState, useMemo, useEffect, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import { type Appointment, type KpiData } from './ManageAppointment.types';
import { appointmentService } from '../../services/appointmentService';

export const useManageAppointmentHooks = () => {
  const t = useTranslation('ManageAppointment');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('ALL');

  // Modals
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Fetch appointments from API
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await appointmentService.getAll(0, 1000);
      if (response?.result?.content) {
        setAppointments(response.result.content);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => fetchAppointments());
  }, [fetchAppointments]);

  // Computed KPI Data
  const kpiData = useMemo<KpiData>(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === 'PENDING').length,
      confirmed: appointments.filter((a) => a.status === 'CONFIRMED').length,
      completed: appointments.filter((a) => a.status === 'COMPLETED').length,
      cancelled: appointments.filter((a) => a.status === 'CANCELLED').length,
    };
  }, [appointments]);

  // Derived filtered data
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchKeyword = keyword
        ? (app.patientName || '').toLowerCase().includes(keyword.toLowerCase()) ||
          (app.patientPhone || '').includes(keyword)
        : true;
      const matchDate = date ? app.appointmentDate === date : true;
      const matchStatus = status !== 'ALL' ? app.status === status : true;
      return matchKeyword && matchDate && matchStatus;
    });
  }, [appointments, keyword, date, status]);

  const handleKeywordChange = (val: string) => {
    setKeyword(val);
    setPage(0);
  };
  const handleDateChange = (val: string) => {
    setDate(val);
    setPage(0);
  };
  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(0);
  };

  const totalElements = filteredAppointments.length;
  const paginatedAppointments = filteredAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetail = (app: Appointment) => {
    setSelectedAppointment(app);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedAppointment(null);
  };

  return {
    t,
    appointments: paginatedAppointments,
    loading,
    page,
    rowsPerPage,
    totalElements,
    keyword,
    setKeyword: handleKeywordChange,
    date,
    setDate: handleDateChange,
    status,
    setStatus: handleStatusChange,
    kpiData,
    handleChangePage,
    handleChangeRowsPerPage,
    openDetail,
    selectedAppointment,
    handleOpenDetail,
    handleCloseDetail,
  };
};
