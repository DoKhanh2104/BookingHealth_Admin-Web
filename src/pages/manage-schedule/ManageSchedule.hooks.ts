import { useState, useMemo, useEffect, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { LeaveRequest, WorkSchedule, TimeSlotConfig } from './ManageSchedule.types';
import { clinicService } from '../../services/clinicService';
import { doctorService } from '../../services/doctorService';
import { toast } from 'sonner';

// Mock Data for Leave Requests
const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LR001',
    doctorId: 1,
    doctorName: 'BS. Nguyễn Văn An',
    clinicName: 'Phòng khám Nha khoa Quốc tế',
    startDate: '2026-05-20',
    endDate: '2026-05-22',
    reason: 'Tham gia hội nghị khoa học thường niên ngành Nha khoa răng hàm mặt tại TP.HCM',
    status: 'PENDING',
  },
  {
    id: 'LR002',
    doctorId: 2,
    doctorName: 'BS. Trần Thị Bình',
    clinicName: 'Phòng khám Tim mạch Tâm Đức',
    startDate: '2026-05-25',
    endDate: '2026-05-25',
    reason: 'Giải quyết công việc gia đình đột xuất',
    status: 'APPROVED',
  },
  {
    id: 'LR003',
    doctorId: 3,
    doctorName: 'BS. Lê Hoàng',
    clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
    startDate: '2026-05-28',
    endDate: '2026-05-30',
    reason: 'Nghỉ phép thường niên đi du lịch cùng gia đình',
    status: 'REJECTED',
  },
  {
    id: 'LR004',
    doctorId: 1,
    doctorName: 'BS. Nguyễn Văn An',
    clinicName: 'Phòng khám Nha khoa Quốc tế',
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    reason: 'Nghỉ ốm điều trị tại bệnh viện',
    status: 'PENDING',
  },
];

// Mock Data for Work Schedules (Master Schedule View-Only)
const MOCK_WORK_SCHEDULES: WorkSchedule[] = [
  {
    id: 'WS001',
    doctorId: 1,
    doctorName: 'BS. Nguyễn Văn An',
    clinicId: 1,
    clinicName: 'Phòng khám Nha khoa Quốc tế',
    date: '2026-05-18',
    timeSlots: [
      '08:00 - 08:30',
      '08:30 - 09:00',
      '09:00 - 09:30',
      '09:30 - 10:00',
      '10:00 - 10:30',
      '14:00 - 14:30',
      '14:30 - 15:00',
    ],
  },
  {
    id: 'WS002',
    doctorId: 2,
    doctorName: 'BS. Trần Thị Bình',
    clinicId: 2,
    clinicName: 'Phòng khám Tim mạch Tâm Đức',
    date: '2026-05-18',
    timeSlots: [
      '08:00 - 08:30',
      '09:00 - 09:30',
      '10:00 - 10:30',
      '11:00 - 11:30',
      '15:00 - 15:30',
      '16:00 - 16:30',
    ],
  },
  {
    id: 'WS003',
    doctorId: 3,
    doctorName: 'BS. Lê Hoàng',
    clinicId: 3,
    clinicName: 'Phòng khám đa khoa Hoàn Mỹ',
    date: '2026-05-18',
    timeSlots: [
      '08:30 - 09:00',
      '09:30 - 10:00',
      '10:30 - 11:00',
      '13:30 - 14:00',
      '14:30 - 15:00',
    ],
  },
  {
    id: 'WS004',
    doctorId: 1,
    doctorName: 'BS. Nguyễn Văn An',
    clinicId: 1,
    clinicName: 'Phòng khám Nha khoa Quốc tế',
    date: '2026-05-19',
    timeSlots: ['08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '10:00 - 10:30'],
  },
  {
    id: 'WS005',
    doctorId: 2,
    doctorName: 'BS. Trần Thị Bình',
    clinicId: 2,
    clinicName: 'Phòng khám Tim mạch Tâm Đức',
    date: '2026-05-19',
    timeSlots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '15:00 - 15:30'],
  },
];

// Mock Data for Standard Time Slots (Master Data)
const MOCK_TIME_SLOTS: TimeSlotConfig[] = [
  { id: '1', code: 'KG01', startTime: '08:00', endTime: '08:30', isActive: true },
  { id: '2', code: 'KG02', startTime: '08:30', endTime: '09:00', isActive: true },
  { id: '3', code: 'KG03', startTime: '09:00', endTime: '09:30', isActive: true },
  { id: '4', code: 'KG04', startTime: '09:30', endTime: '10:00', isActive: true },
  { id: '5', code: 'KG05', startTime: '10:00', endTime: '10:30', isActive: true },
  { id: '6', code: 'KG06', startTime: '10:30', endTime: '11:00', isActive: true },
  { id: '7', code: 'KG07', startTime: '11:00', endTime: '11:30', isActive: false },
  { id: '8', code: 'KG08', startTime: '13:30', endTime: '14:00', isActive: true },
  { id: '9', code: 'KG09', startTime: '14:00', endTime: '14:30', isActive: true },
  { id: '10', code: 'KG10', startTime: '14:30', endTime: '15:00', isActive: true },
  { id: '11', code: 'KG11', startTime: '15:00', endTime: '15:30', isActive: true },
  { id: '12', code: 'KG12', startTime: '15:30', endTime: '16:00', isActive: true },
  { id: '13', code: 'KG13', startTime: '16:00', endTime: '16:30', isActive: true },
];

export const useManageScheduleHooks = () => {
  type ClinicModel = {
    id: number;
    name: string;
    clinicName: string;
  };
  type DoctorModel = {
    id: number;
    name: string;
    fullName: string;
    doctorName: string;
  };
  const t = useTranslation('ManageSchedule');

  // Main UI states
  const [tabIndex, setTabIndex] = useState(0);

  // Core Data States
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>(MOCK_WORK_SCHEDULES);
  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>(MOCK_TIME_SLOTS);

  // Form / Autocomplete API states
  const [clinics, setClinics] = useState<Array<{ id: number; name: string }>>([]);
  const [doctors, setDoctors] = useState<Array<{ id: number; name: string }>>([]);

  // Filters Tab 1: Duyệt ngày nghỉ phép
  const [leaveStatusFilter, setLeaveStatusFilter] = useState<string>('ALL');
  const [leavePage, setLeavePage] = useState(0);
  const [leaveRowsPerPage, setLeaveRowsPerPage] = useState(5);

  // Filters Tab 2: Theo dõi lịch làm việc
  const [scheduleClinicId, setScheduleClinicId] = useState<number | 'all'>('all');
  const [scheduleDoctorId, setScheduleDoctorId] = useState<number | 'all'>('all');
  const [scheduleDate, setScheduleDate] = useState<string>('2026-05-18'); // Default matching mock date
  const [schedulePage, setSchedulePage] = useState(0);
  const [scheduleRowsPerPage, setScheduleRowsPerPage] = useState(5);

  // Filters Tab 3: Cấu hình Khung giờ
  const [slotPage, setSlotPage] = useState(0);
  const [slotRowsPerPage, setSlotRowsPerPage] = useState(5);
  const [openAddSlotModal, setOpenAddSlotModal] = useState(false);

  // Fetch real Doctors & Clinics from backend to make filters dynamic
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Load clinics
        const clinicRes = await clinicService.getAll(0, 100);
        if (clinicRes?.result?.content) {
          setClinics(
            clinicRes.result.content.map((c: ClinicModel) => ({
              id: c.id,
              name: c.name || c.clinicName || '',
            })),
          );
        } else {
          // fallback
          setClinics([
            { id: 1, name: 'Phòng khám Nha khoa Quốc tế' },
            { id: 2, name: 'Phòng khám Tim mạch Tâm Đức' },
            { id: 3, name: 'Phòng khám đa khoa Hoàn Mỹ' },
          ]);
        }

        // Load doctors
        const doctorRes = await doctorService.getAll(0, 100);
        if (doctorRes?.result?.content) {
          setDoctors(
            doctorRes.result.content.map((d: DoctorModel) => ({
              id: d.id,
              name: d.fullName || d.doctorName || '',
            })),
          );
        } else {
          // fallback
          setDoctors([
            { id: 1, name: 'BS. Nguyễn Văn An' },
            { id: 2, name: 'BS. Trần Thị Bình' },
            { id: 3, name: 'BS. Lê Hoàng' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching dropdown filters data, falling back to mock.', error);
        setClinics([
          { id: 1, name: 'Phòng khám Nha khoa Quốc tế' },
          { id: 2, name: 'Phòng khám Tim mạch Tâm Đức' },
          { id: 3, name: 'Phòng khám đa khoa Hoàn Mỹ' },
        ]);
        setDoctors([
          { id: 1, name: 'BS. Nguyễn Văn An' },
          { id: 2, name: 'BS. Trần Thị Bình' },
          { id: 3, name: 'BS. Lê Hoàng' },
        ]);
      }
    };
    fetchDropdownData();
  }, []);

  // --- ACTIONS FOR TAB 1: Duyệt nghỉ phép ---
  const handleApproveLeave = (id: string) => {
    const req = leaveRequests.find((r) => r.id === id);
    if (!req) return;

    setLeaveRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)));

    // Also: system automatically closes matching doctor schedule dates!
    // We can simulate this by filtering out their active slots or updating
    // workSchedules in mock data.
    setWorkSchedules((prev) =>
      prev.filter(
        (ws) =>
          !(ws.doctorId === req.doctorId && ws.date >= req.startDate && ws.date <= req.endDate),
      ),
    );

    toast.success(t('leaveApproval.messages.approveSuccess', { name: req.doctorName }));
  };

  const handleRejectLeave = (id: string) => {
    const req = leaveRequests.find((r) => r.id === id);
    if (!req) return;

    setLeaveRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r)));
    toast.error(t('leaveApproval.messages.rejectSuccess', { name: req.doctorName }));
  };

  // Filtered leave requests
  const filteredLeaveRequests = useMemo(() => {
    return leaveRequests.filter((req) => {
      if (leaveStatusFilter === 'ALL') return true;
      return req.status === leaveStatusFilter;
    });
  }, [leaveRequests, leaveStatusFilter]);

  // Paginated leave requests
  const paginatedLeaveRequests = useMemo(() => {
    return filteredLeaveRequests.slice(
      leavePage * leaveRowsPerPage,
      leavePage * leaveRowsPerPage + leaveRowsPerPage,
    );
  }, [filteredLeaveRequests, leavePage, leaveRowsPerPage]);

  const handleChangeLeavePage = (_event: unknown, newPage: number) => {
    setLeavePage(newPage);
  };

  const handleChangeLeaveRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLeaveRowsPerPage(parseInt(event.target.value, 10));
    setLeavePage(0);
  };

  // --- ACTIONS FOR TAB 2: Theo dõi lịch trực toàn sàn ---
  const filteredWorkSchedules = useMemo(() => {
    return workSchedules.filter((ws) => {
      const matchClinic = scheduleClinicId === 'all' || ws.clinicId === scheduleClinicId;
      const matchDoctor = scheduleDoctorId === 'all' || ws.doctorId === scheduleDoctorId;
      const matchDate = !scheduleDate || ws.date === scheduleDate;
      return matchClinic && matchDoctor && matchDate;
    });
  }, [workSchedules, scheduleClinicId, scheduleDoctorId, scheduleDate]);

  const paginatedWorkSchedules = useMemo(() => {
    return filteredWorkSchedules.slice(
      schedulePage * scheduleRowsPerPage,
      schedulePage * scheduleRowsPerPage + scheduleRowsPerPage,
    );
  }, [filteredWorkSchedules, schedulePage, scheduleRowsPerPage]);

  const handleChangeSchedulePage = (_event: unknown, newPage: number) => {
    setSchedulePage(newPage);
  };

  const handleChangeScheduleRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setScheduleRowsPerPage(parseInt(event.target.value, 10));
    setSchedulePage(0);
  };

  // --- ACTIONS FOR TAB 3: Cấu hình Khung giờ ---
  const handleToggleSlotStatus = (id: string) => {
    setTimeSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, isActive: !slot.isActive } : slot)),
    );
    toast.success(t('timeSlotConfig.messages.toggleSuccess'));
  };

  const handleAddTimeSlot = (code: string, startTime: string, endTime: string) => {
    // Perform validations
    if (!code || !startTime || !endTime) {
      toast.error(t('timeSlotConfig.modals.validation.required'));
      return false;
    }

    if (startTime >= endTime) {
      toast.error(t('timeSlotConfig.modals.validation.timeCompare'));
      return false;
    }

    // Check duplicate code
    if (timeSlots.some((slot) => slot.code.toLowerCase() === code.toLowerCase())) {
      toast.error(t('timeSlotConfig.modals.validation.codeDuplicate'));
      return false;
    }

    const newSlot: TimeSlotConfig = {
      id: String(timeSlots.length + 1),
      code: code.toUpperCase(),
      startTime,
      endTime,
      isActive: true,
    };

    setTimeSlots((prev) => [...prev, newSlot]);
    toast.success(t('timeSlotConfig.modals.success', { code: newSlot.code }));
    return true;
  };

  const paginatedTimeSlots = useMemo(() => {
    return timeSlots.slice(
      slotPage * slotRowsPerPage,
      slotPage * slotRowsPerPage + slotRowsPerPage,
    );
  }, [timeSlots, slotPage, slotRowsPerPage]);

  const handleChangeSlotPage = (_event: unknown, newPage: number) => {
    setSlotPage(newPage);
  };

  const handleChangeSlotRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setSlotRowsPerPage(parseInt(event.target.value, 10));
    setSlotPage(0);
  };

  return {
    t,
    tabIndex,
    setTabIndex,

    // Real API dropdown data
    clinics,
    doctors,

    // Leave approvals tab
    leaveRequests: paginatedLeaveRequests,
    leaveTotalElements: filteredLeaveRequests.length,
    leavePage,
    leaveRowsPerPage,
    leaveStatusFilter,
    setLeaveStatusFilter,
    handleChangeLeavePage,
    handleChangeLeaveRowsPerPage,
    handleApproveLeave,
    handleRejectLeave,

    // Work schedules tab
    workSchedules: paginatedWorkSchedules,
    scheduleTotalElements: filteredWorkSchedules.length,
    schedulePage,
    scheduleRowsPerPage,
    scheduleClinicId,
    setScheduleClinicId,
    scheduleDoctorId,
    setScheduleDoctorId,
    scheduleDate,
    setScheduleDate,
    handleChangeSchedulePage,
    handleChangeScheduleRowsPerPage,

    // Time slot configs tab
    timeSlots: paginatedTimeSlots,
    slotTotalElements: timeSlots.length,
    slotPage,
    slotRowsPerPage,
    openAddSlotModal,
    setOpenAddSlotModal,
    handleChangeSlotPage,
    handleChangeSlotRowsPerPage,
    handleToggleSlotStatus,
    handleAddTimeSlot,
  };
};
