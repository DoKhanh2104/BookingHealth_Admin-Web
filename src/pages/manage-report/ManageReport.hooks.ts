import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type {
  FinancialReportRow,
  PerformanceReportRow,
  SatisfactionReportRow,
} from './ManageReport.types';
import { reportService } from '../../services/reportService';
import { specialtyService } from '../../services/specialtyService';
import { clinicService } from '../../services/clinicService';
import { toast } from 'sonner';

export const useManageReportHooks = () => {
  const t = useTranslation('ManageReport');

  // Filter conditions
  const [fromDate, setFromDate] = useState(() => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return thirtyDaysAgo.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [specialtyId, setSpecialtyId] = useState<string | number>('all');
  const [clinicId, setClinicId] = useState<string | number>('all');

  // Active Tab state
  const [tabValue, setTabValue] = useState<'financial' | 'performance' | 'satisfaction'>(
    'financial',
  );

  // Data states
  const [financialData, setFinancialData] = useState<FinancialReportRow[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceReportRow[]>([]);
  const [satisfactionData, setSatisfactionData] = useState<SatisfactionReportRow[]>([]);

  const [loading, setLoading] = useState(false);

  // Dropdown lists
  const [specialties, setSpecialties] = useState<{ id: number | string; name: string }[]>([]);
  const [clinics, setClinics] = useState<{ id: number | string; name: string }[]>([]);

  // Fetch filter dropdown options
  const fetchDropdowns = useCallback(async () => {
    try {
      const specialtyRes = await specialtyService.getAll(0, 100);
      if (specialtyRes && specialtyRes.data) {
        setSpecialties(specialtyRes.data);
      }
      const clinicRes = await clinicService.getAll(0, 100, '');
      if (clinicRes && clinicRes.data) {
        setClinics(clinicRes.data);
      }
    } catch {
      console.log('Failed to fetch dropdowns');
    }
  }, []);

  // Main data fetcher
  const fetchReportData = useCallback(async () => {
    setLoading(true);
    const params = {
      fromDate,
      toDate,
      specialtyId: specialtyId === 'all' ? undefined : specialtyId,
      clinicId: clinicId === 'all' ? undefined : clinicId,
    };

    try {
      const [financial, performance, satisfaction] = await Promise.all([
        reportService.getFinancialReport(params),
        reportService.getPerformanceReport(params),
        reportService.getSatisfactionReport(params),
      ]);

      setFinancialData(financial);
      setPerformanceData(performance);
      setSatisfactionData(satisfaction);
    } catch {
      toast.error('Lỗi khi lấy dữ liệu báo cáo từ máy chủ.');
      setFinancialData([]);
      setPerformanceData([]);
      setSatisfactionData([]);
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, specialtyId, clinicId]);

  useEffect(() => {
    Promise.resolve().then(() => fetchDropdowns());
  }, [fetchDropdowns]);

  useEffect(() => {
    Promise.resolve().then(() => fetchReportData());
  }, [fetchReportData]);

  // Tab changer handler
  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: 'financial' | 'performance' | 'satisfaction',
  ) => {
    setTabValue(newValue);
  };

  // Excel Excel download trigger
  const handleExportExcel = async () => {
    try {
      const blob = await reportService.exportRevenueExcel({
        fromDate,
        toDate,
        specialtyId: specialtyId === 'all' ? undefined : specialtyId,
        clinicId: clinicId === 'all' ? undefined : clinicId,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Bao_Cao_Doanh_Thu_${fromDate}_den_${toDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(t('messages.exportSuccess'));
    } catch (err) {
      console.log('Backend POI excel export offline, generating client-side CSV fallback.', err);
      // High-fidelity client-side fallback spreadsheet
      const csvHeaders = [
        'STT',
        'Ma lich hen',
        'Benh nhan',
        'Bac si',
        'So tien kham (VND)',
        'Phuong thuc',
        'Thoi gian thanh toan',
      ];
      const csvRows = financialData.map((row, index) => [
        index + 1,
        row.appointmentId,
        row.patientName,
        row.doctorName,
        row.amount,
        row.paymentMethod,
        row.paymentTime,
      ]);

      const BOM = '\uFEFF';
      const csvContent =
        BOM + [csvHeaders.join(','), ...csvRows.map((e) => e.join(','))].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Bao_Cao_Doanh_Thu_${fromDate}_den_${toDate}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(t('messages.exportSuccess'));
    }
  };

  // Compute Total Financial Metrics
  const financialMetrics = useMemo(() => {
    const totalRevenue = financialData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalTransactions = financialData.length;
    const avgValue = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;
    return { totalRevenue, totalTransactions, avgValue };
  }, [financialData]);

  return {
    t,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    specialtyId,
    setSpecialtyId,
    clinicId,
    setClinicId,
    tabValue,
    handleTabChange,
    loading,
    specialties,
    clinics,
    financialData,
    performanceData,
    satisfactionData,
    handleExportExcel,
    financialMetrics,
  };
};
