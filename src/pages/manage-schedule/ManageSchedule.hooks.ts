import { useState, useMemo, useEffect, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type {
  LeaveRequest,
  WorkSchedule,
  TimeSlotConfig,
  BackendWorkSchedule,
} from './ManageSchedule.types';
import { clinicService } from '../../services/clinicService';
import { doctorService } from '../../services/doctorService';
import { appointmentSlotService } from '../../services/appointmentSlotService';
import { dayOffService } from '../../services/dayOffService';
import type { DayOffItem } from '../../services/dayOffService';
import { toast } from 'sonner';

interface AxiosErrorLike {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Helper: map backend status (0,1,2) to frontend status string
const mapStatus = (status: number): 'PENDING' | 'APPROVED' | 'REJECTED' => {
  switch (status) {
    case 1:
      return 'APPROVED';
    case 2:
      return 'REJECTED';
    default:
      return 'PENDING';
  }
};

// Helper: map backend status filter string to number
const mapStatusFilterToNumber = (filter: string): number | null => {
  switch (filter) {
    case 'PENDING':
      return 0;
    case 'APPROVED':
      return 1;
    case 'REJECTED':
      return 2;
    default:
      return null; // ALL
  }
};

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
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveTotalElements, setLeaveTotalElements] = useState(0);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [scheduleTotalElements, setScheduleTotalElements] = useState(0);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>([]);

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
  const [scheduleDate, setScheduleDate] = useState<string>(new Date().toISOString().split('T')[0]);
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
        }
      } catch (error) {
        console.error('Error fetching dropdown filters data.', error);
      }
    };
    fetchDropdownData();
  }, []);

  // --- TAB 1: Fetch leave requests from API ---
  const fetchLeaveRequests = useCallback(async () => {
    setLeaveLoading(true);
    try {
      const statusNum = mapStatusFilterToNumber(leaveStatusFilter);
      const res = await dayOffService.getAll(statusNum, leavePage, leaveRowsPerPage);
      if (res?.result) {
        const content = res.result.content || [];
        const mapped: LeaveRequest[] = content.map((item: DayOffItem) => ({
          id: item.id,
          doctorId: item.doctorId,
          doctorName: item.doctorName || '',
          clinicName: item.clinicName || '',
          startDate: item.startDate || '',
          endDate: item.endDate || '',
          reason: item.reason || '',
          status: mapStatus(item.status),
        }));
        setLeaveRequests(mapped);
        setLeaveTotalElements(res.result.totalElements || 0);
      } else {
        setLeaveRequests([]);
        setLeaveTotalElements(0);
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setLeaveRequests([]);
      setLeaveTotalElements(0);
    } finally {
      setLeaveLoading(false);
    }
  }, [leaveStatusFilter, leavePage, leaveRowsPerPage]);

  useEffect(() => {
    if (tabIndex === 0) {
      Promise.resolve().then(() => fetchLeaveRequests());
    }
  }, [tabIndex, fetchLeaveRequests]);

  // Reset page when filter changes
  useEffect(() => {
    Promise.resolve().then(() => setLeavePage(0));
  }, [leaveStatusFilter]);

  const handleApproveLeave = async (id: number) => {
    try {
      await dayOffService.approve(id);
      const req = leaveRequests.find((r) => r.id === id);
      toast.success(t('leaveApproval.messages.approveSuccess', { name: req?.doctorName || '' }));
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error approving leave:', error);
      toast.error('Không thể duyệt đơn nghỉ phép');
    }
  };

  const handleRejectLeave = async (id: number) => {
    try {
      await dayOffService.reject(id);
      const req = leaveRequests.find((r) => r.id === id);
      toast.error(t('leaveApproval.messages.rejectSuccess', { name: req?.doctorName || '' }));
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      toast.error('Không thể từ chối đơn nghỉ phép');
    }
  };

  const handleChangeLeavePage = (_event: unknown, newPage: number) => {
    setLeavePage(newPage);
  };

  const handleChangeLeaveRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLeaveRowsPerPage(parseInt(event.target.value, 10));
    setLeavePage(0);
  };

  // --- TAB 2: Fetch time slots ---
  const fetchTimeSlots = useCallback(async () => {
    try {
      const res = await appointmentSlotService.getAll(0, 1000);
      const data = res?.result?.content || res?.result || res || [];
      if (Array.isArray(data)) {
        setTimeSlots(
          data.map(
            (slot: {
              id: number;
              code?: string;
              startTime: string;
              endTime: string;
              status?: number;
              isActive?: boolean;
            }) => ({
              id: String(slot.id),
              code: slot.code || `KG${slot.id}`,
              startTime:
                typeof slot.startTime === 'string' && slot.startTime.length > 5
                  ? slot.startTime.slice(0, 5)
                  : slot.startTime,
              endTime:
                typeof slot.endTime === 'string' && slot.endTime.length > 5
                  ? slot.endTime.slice(0, 5)
                  : slot.endTime,
              isActive: slot.status === 1 || slot.status === undefined,
            }),
          ),
        );
      } else {
        setTimeSlots([]);
      }
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setTimeSlots([]);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchTimeSlots();
    });
  }, [fetchTimeSlots]);

  // --- ACTIONS FOR TAB 2: Theo dõi lịch trực toàn sàn ---
  const fetchWorkSchedules = useCallback(async () => {
    if (!scheduleDate) return;
    setScheduleLoading(true);
    try {
      const res = await doctorService.getWorkSchedules(
        scheduleDate,
        scheduleClinicId,
        scheduleDoctorId,
        schedulePage,
        scheduleRowsPerPage,
      );
      if (res?.result?.content) {
        setWorkSchedules(
          res.result.content.map((ws: BackendWorkSchedule) => ({
            id: String(ws.id),
            doctorId: ws.doctorId,
            doctorName: ws.doctorName,
            clinicId: ws.clinicId,
            clinicName: ws.clinicName,
            date: String(ws.date),
            timeSlots: ws.timeSlots || [],
          })),
        );
        setScheduleTotalElements(res.result.totalElements || 0);
      } else {
        setWorkSchedules([]);
        setScheduleTotalElements(0);
      }
    } catch (error) {
      console.error('Failed to fetch work schedules:', error);
      setWorkSchedules([]);
      setScheduleTotalElements(0);
    } finally {
      setScheduleLoading(false);
    }
  }, [scheduleDate, scheduleClinicId, scheduleDoctorId, schedulePage, scheduleRowsPerPage]);

  useEffect(() => {
    if (tabIndex === 1) {
      Promise.resolve().then(() => fetchWorkSchedules());
    }
  }, [tabIndex, fetchWorkSchedules]);

  useEffect(() => {
    Promise.resolve().then(() => setSchedulePage(0));
  }, [scheduleClinicId, scheduleDoctorId, scheduleDate]);

  const handleChangeSchedulePage = (_event: unknown, newPage: number) => {
    setSchedulePage(newPage);
  };

  const handleChangeScheduleRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setScheduleRowsPerPage(parseInt(event.target.value, 10));
    setSchedulePage(0);
  };

  // --- ACTIONS FOR TAB 3: Cấu hình Khung giờ ---
  const handleToggleSlotStatus = async (id: string) => {
    try {
      await appointmentSlotService.updateStatus(Number(id));
      toast.success(t('timeSlotConfig.messages.toggleSuccess'));
      fetchTimeSlots();
    } catch (err) {
      console.error('Error toggling time slot status:', err);
      const axiosErr = err as AxiosErrorLike;
      toast.error(axiosErr?.response?.data?.message || 'Có lỗi xảy ra khi thay đổi trạng thái.');
    }
  };

  const handleAddTimeSlot = async (startTime: string, endTime: string) => {
    if (!startTime || !endTime) {
      toast.error(t('timeSlotConfig.modals.validation.required'));
      return false;
    }

    if (startTime >= endTime) {
      toast.error(t('timeSlotConfig.modals.validation.timeCompare'));
      return false;
    }

    try {
      const formattedStartTime = startTime.length === 5 ? `${startTime}:00` : startTime;
      const formattedEndTime = endTime.length === 5 ? `${endTime}:00` : endTime;

      const res = await appointmentSlotService.add(formattedStartTime, formattedEndTime);
      if (res?.code === 200 || res?.status === 'success' || res) {
        const code = res?.result?.code || '';
        toast.success(t('timeSlotConfig.modals.success', { code }));
        fetchTimeSlots();
        return true;
      } else {
        toast.error(res?.message || 'Có lỗi xảy ra khi thêm khung giờ.');
        return false;
      }
    } catch (err) {
      console.error('Error adding time slot:', err);
      const axiosErr = err as AxiosErrorLike;
      toast.error(axiosErr?.response?.data?.message || 'Có lỗi xảy ra khi thêm khung giờ.');
      return false;
    }
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
    leaveRequests,
    leaveTotalElements,
    leaveLoading,
    leavePage,
    leaveRowsPerPage,
    leaveStatusFilter,
    setLeaveStatusFilter,
    handleChangeLeavePage,
    handleChangeLeaveRowsPerPage,
    handleApproveLeave,
    handleRejectLeave,

    // Work schedules tab
    workSchedules,
    scheduleTotalElements,
    scheduleLoading,
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
