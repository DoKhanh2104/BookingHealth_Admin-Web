import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type { Patient, PatientAppointment, BackendPatient, BackendAppointment } from './ManagePatient.types';
import { patientService } from '../../services/patientService';
import { toast } from 'sonner';

export const useManagePatientHooks = () => {
  const t = useTranslation('ManagePatient');

  // Core Data States
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, _setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const setSearchQuery = useCallback((val: string | ((prev: string) => string)) => {
    _setSearchQuery(val);
    setPage(0);
  }, []);

  // History Modal states
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState<PatientAppointment[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Fetch patients list from API
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await patientService.getPatients(page, rowsPerPage, searchQuery);
      if (res?.result?.content) {
        setPatients(
          res.result.content.map((p: BackendPatient) => ({
            id: String(p.id),
            fullName: p.name || '',
            phone: p.phone || '',
            email: p.email || '',
            status: p.status === 2 ? 'LOCKED' : 'ACTIVE',
            createdAt: '',
          })),
        );
        setTotalPatients(res.result.totalElements || 0);
      } else {
        setPatients([]);
        setTotalPatients(0);
      }
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      setPatients([]);
      setTotalPatients(0);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQuery]);

  useEffect(() => {
    Promise.resolve().then(() => fetchPatients());
  }, [fetchPatients]);



  // Toggle patient lock/unlock account status on backend
  const handleToggleLock = async (id: string) => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) return;

    try {
      const res = await patientService.toggleLock(id);
      if (res) {
        const nextStatus = patient.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
        setPatients((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p)),
        );
        if (nextStatus === 'LOCKED') {
          toast.success(t('messages.lockSuccess', { name: patient.fullName }));
        } else {
          toast.success(t('messages.unlockSuccess', { name: patient.fullName }));
        }
      }
    } catch (error) {
      console.error('Failed to toggle patient lock:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái.');
    }
  };

  // Open history dialog and fetch booking history from backend
  const handleOpenHistory = async (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenHistory(true);
    setHistoryLoading(true);
    try {
      const res = await patientService.getAppointments(patient.id, 0, 100);
      if (res?.result?.content) {
        setSelectedPatientHistory(
          res.result.content.map((a: BackendAppointment) => {
            const docName = a.doctor?.name || '';
            const clinicName = a.doctor?.clinic?.clinicName || '';
            const timeSlotStr =
              a.appointmentSlot?.startTime && a.appointmentSlot?.endTime
                ? `${a.appointmentSlot.startTime.slice(0, 5)} - ${a.appointmentSlot.endTime.slice(0, 5)}`
                : '';

            const statusMap: Record<number, PatientAppointment['status']> = {
              0: 'PENDING',
              1: 'CONFIRMED',
              2: 'COMPLETED',
              3: 'CANCELLED',
            };

            return {
              id: String(a.id),
              doctorName: docName,
              clinicName: clinicName,
              date: a.expectedExaminationDate || '',
              timeSlot: timeSlotStr,
              status: statusMap[a.status] || 'PENDING',
            };
          }),
        );
      } else {
        setSelectedPatientHistory([]);
      }
    } catch (error) {
      console.error('Failed to fetch patient history:', error);
      setSelectedPatientHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Close history dialog
  const handleCloseHistory = () => {
    setSelectedPatient(null);
    setSelectedPatientHistory([]);
    setOpenHistory(false);
  };

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
    patients,
    totalPatients,
    loading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleToggleLock,
    openHistory,
    selectedPatient,
    selectedPatientHistory,
    historyLoading,
    handleOpenHistory,
    handleCloseHistory,
  };
};
