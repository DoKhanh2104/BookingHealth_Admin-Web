import { useState, useMemo, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { Patient, PatientAppointment } from './ManagePatient.types';
import { toast } from 'sonner';

// Mock Patient Database
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT001',
    fullName: 'Nguyễn Thùy Linh',
    phone: '0912345678',
    email: 'thuylinh.nguyen@gmail.com',
    status: 'ACTIVE',
    createdAt: '2025-10-12',
  },
  {
    id: 'PT002',
    fullName: 'Trần Minh Thành',
    phone: '0987654321',
    email: 'minhthanh.tran@yahoo.com',
    status: 'ACTIVE',
    createdAt: '2025-11-05',
  },
  {
    id: 'PT003',
    fullName: 'Lê Thị Thu Hằng',
    phone: '0905123456',
    email: 'thuhang.le@outlook.com',
    status: 'ACTIVE',
    createdAt: '2025-12-20',
  },
  {
    id: 'PT004',
    fullName: 'Phạm Hồng Minh',
    phone: '0935987654',
    email: 'hongminh.pham@gmail.com',
    status: 'ACTIVE', // This profile has multiple no-show/spam flags!
    createdAt: '2026-01-15',
  },
  {
    id: 'PT005',
    fullName: 'Võ Hoàng Triều Vy',
    phone: '0944654321',
    email: 'trieuvy.vo@gmail.com',
    status: 'ACTIVE',
    createdAt: '2026-03-02',
  },
  {
    id: 'PT006',
    fullName: 'Đỗ Anh Tuấn',
    phone: '0911223344',
    email: 'anhtuan.do@gmail.com',
    status: 'LOCKED', // Lock by default to demonstrate locked user behavior
    createdAt: '2025-09-18',
  },
];

// Mock Patient Booking Logs (LICH_HEN)
const MOCK_PATIENT_APPOINTMENTS: Record<string, PatientAppointment[]> = {
  PT001: [
    {
      id: 'LH001',
      doctorName: 'BS. Nguyễn Văn An',
      clinicName: 'Phòng khám Nha khoa Quốc tế',
      date: '2026-05-10',
      timeSlot: '09:00 - 09:30',
      status: 'COMPLETED',
    },
    {
      id: 'LH002',
      doctorName: 'BS. Trần Thị Bình',
      clinicName: 'Phòng khám Tim mạch Tâm Đức',
      date: '2026-05-12',
      timeSlot: '14:30 - 15:00',
      status: 'NO_SHOW',
    },
    {
      id: 'LH003',
      doctorName: 'BS. Nguyễn Văn An',
      clinicName: 'Phòng khám Nha khoa Quốc tế',
      date: '2026-05-15',
      timeSlot: '08:30 - 09:00',
      status: 'CANCELLED',
    },
  ],
  PT002: [
    {
      id: 'LH004',
      doctorName: 'BS. Lê Hoàng',
      clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
      date: '2026-05-08',
      timeSlot: '10:30 - 11:00',
      status: 'COMPLETED',
    },
    {
      id: 'LH005',
      doctorName: 'BS. Trần Thị Bình',
      clinicName: 'Phòng khám Tim mạch Tâm Đức',
      date: '2026-05-14',
      timeSlot: '15:00 - 15:30',
      status: 'COMPLETED',
    },
    {
      id: 'LH006',
      doctorName: 'BS. Lê Hoàng',
      clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
      date: '2026-05-18',
      timeSlot: '09:30 - 10:00',
      status: 'NO_SHOW',
    },
  ],
  PT003: [
    {
      id: 'LH007',
      doctorName: 'BS. Nguyễn Văn An',
      clinicName: 'Phòng khám Nha khoa Quốc tế',
      date: '2026-05-09',
      timeSlot: '08:00 - 08:30',
      status: 'COMPLETED',
    },
    {
      id: 'LH008',
      doctorName: 'BS. Trần Thị Bình',
      clinicName: 'Phòng khám Tim mạch Tâm Đức',
      date: '2026-05-16',
      timeSlot: '11:00 - 11:30',
      status: 'COMPLETED',
    },
  ],
  PT004: [
    // This is the spam profile (Phạm Hồng Minh) - multiple bùng hẹn (no-show) logs!
    {
      id: 'LH009',
      doctorName: 'BS. Nguyễn Văn An',
      clinicName: 'Phòng khám Nha khoa Quốc tế',
      date: '2026-05-01',
      timeSlot: '08:30 - 09:00',
      status: 'NO_SHOW',
    },
    {
      id: 'LH010',
      doctorName: 'BS. Lê Hoàng',
      clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
      date: '2026-05-03',
      timeSlot: '14:00 - 14:30',
      status: 'CANCELLED',
    },
    {
      id: 'LH011',
      doctorName: 'BS. Trần Thị Bình',
      clinicName: 'Phòng khám Tim mạch Tâm Đức',
      date: '2026-05-05',
      timeSlot: '10:00 - 10:30',
      status: 'NO_SHOW',
    },
    {
      id: 'LH012',
      doctorName: 'BS. Nguyễn Văn An',
      clinicName: 'Phòng khám Nha khoa Quốc tế',
      date: '2026-05-07',
      timeSlot: '16:00 - 16:30',
      status: 'NO_SHOW',
    },
  ],
  PT005: [], // Newly registered patient, no logs yet
  PT006: [
    {
      id: 'LH013',
      doctorName: 'BS. Lê Hoàng',
      clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
      date: '2026-04-20',
      timeSlot: '13:30 - 14:00',
      status: 'COMPLETED',
    },
  ],
};

export const useManagePatientHooks = () => {
  const t = useTranslation('ManagePatient');

  // Core Data States
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // History Modal states
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Toggle patient lock/unlock account status
  const handleToggleLock = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) return;

    const newStatus = patient.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));

    if (newStatus === 'LOCKED') {
      toast.success(t('messages.lockSuccess', { name: patient.fullName }));
    } else {
      toast.success(t('messages.unlockSuccess', { name: patient.fullName }));
    }
  };

  // Open history dialog
  const handleOpenHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenHistory(true);
  };

  // Close history dialog
  const handleCloseHistory = () => {
    setSelectedPatient(null);
    setOpenHistory(false);
  };

  // Retrieve patient history
  const selectedPatientHistory = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_PATIENT_APPOINTMENTS[selectedPatient.id] || [];
  }, [selectedPatient]);

  // Client-side fuzzy search logic on patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      // Remove accents/diacritics for accents-insensitive fuzzy search
      const cleanStr = (s: string) =>
        s
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

      const patientName = cleanStr(patient.fullName);
      const patientPhone = cleanStr(patient.phone);
      const searchVal = cleanStr(q);

      return patientName.includes(searchVal) || patientPhone.includes(searchVal);
    });
  }, [patients, searchQuery]);

  // Paginated patients list
  const paginatedPatients = useMemo(() => {
    return filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredPatients, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    t,
    searchQuery,
    setSearchQuery,
    patients: paginatedPatients,
    totalPatients: filteredPatients.length,
    loading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleToggleLock,
    openHistory,
    selectedPatient,
    selectedPatientHistory,
    handleOpenHistory,
    handleCloseHistory,
  };
};
