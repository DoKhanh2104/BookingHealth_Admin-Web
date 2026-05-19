import { useState, useMemo, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import { type Appointment, type KpiData } from './ManageAppointment.types';

// Mock Data
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Nguyễn Văn A',
    patientPhone: '0905123456',
    doctorName: 'BS. Nguyễn Văn An',
    specialty: 'Nha khoa',
    appointmentDate: '2026-05-18',
    timeSlot: '08:00 - 08:30',
    totalAmount: 200000,
    status: 'PENDING',
  },
  {
    id: '2',
    patientName: 'Trần Thị B',
    patientPhone: '0912345678',
    doctorName: 'BS. Lê Hoàng',
    specialty: 'Tim mạch',
    appointmentDate: '2026-05-18',
    timeSlot: '09:00 - 09:30',
    totalAmount: 500000,
    status: 'CONFIRMED',
  },
  {
    id: '3',
    patientName: 'Lê Văn C',
    patientPhone: '0987654321',
    doctorName: 'BS. Trần Thị Bình',
    specialty: 'Nội tổng quát',
    appointmentDate: '2026-05-18',
    timeSlot: '10:00 - 10:30',
    totalAmount: 150000,
    status: 'COMPLETED',
    diagnosis: 'Viêm họng cấp',
    prescription: 'Paracetamol 500mg x 10 viên\nVitamin C 500mg x 10 viên',
  },
  {
    id: '4',
    patientName: 'Phạm Thị D',
    patientPhone: '0933112233',
    doctorName: 'BS. Nguyễn Văn An',
    specialty: 'Nha khoa',
    appointmentDate: '2026-05-19',
    timeSlot: '14:00 - 14:30',
    totalAmount: 200000,
    status: 'CANCELLED',
  },
];

export const useManageAppointmentHooks = () => {
  const t = useTranslation('ManageAppointment');

  const [appointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [loading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('ALL');
  const [doctorId, setDoctorId] = useState('all');

  // Modals
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Computed KPI Data
  const kpiData = useMemo<KpiData>(() => {
    // KPI based on all data or filtered data? Usually based on today's total data.
    // For this mockup, we just use the current appointments array.
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
        ? app.patientName.toLowerCase().includes(keyword.toLowerCase()) ||
          app.patientPhone.includes(keyword)
        : true;
      const matchDate = date ? app.appointmentDate === date : true;
      const matchStatus = status !== 'ALL' ? app.status === status : true;

      // Basic mock doctor filter mapping: BS. Nguyễn Văn An -> 1, etc.
      // In a real app, doctorId would be an ID property on the appointment.
      let matchDoctor = true;
      if (doctorId !== 'all') {
        if (doctorId === '1') matchDoctor = app.doctorName.includes('An');
        if (doctorId === '2') matchDoctor = app.doctorName.includes('Bình');
        if (doctorId === '3') matchDoctor = app.doctorName.includes('Hoàng');
      }

      return matchKeyword && matchDate && matchStatus && matchDoctor;
    });
  }, [appointments, keyword, date, status, doctorId]);

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
  const handleDoctorIdChange = (val: string) => {
    setDoctorId(val);
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
    doctorId,
    setDoctorId: handleDoctorIdChange,
    kpiData,
    handleChangePage,
    handleChangeRowsPerPage,
    openDetail,
    selectedAppointment,
    handleOpenDetail,
    handleCloseDetail,
  };
};
