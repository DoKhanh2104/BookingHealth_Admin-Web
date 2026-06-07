import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';
import type {
  FinancialReportRow,
  PerformanceReportRow,
  SatisfactionReportRow,
} from './ManageReport.types';
import { reportService } from '../../services/reportService';
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

  // Active Tab state
  const [tabValue, setTabValue] = useState<'financial' | 'performance' | 'satisfaction'>(
    'financial',
  );

  // Data states
  const [financialData, setFinancialData] = useState<FinancialReportRow[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceReportRow[]>([]);
  const [satisfactionData, setSatisfactionData] = useState<SatisfactionReportRow[]>([]);

  // Pagination states
  const [financialPage, setFinancialPage] = useState(0);
  const [financialRowsPerPage, setFinancialRowsPerPage] = useState(10);

  const [performancePage, setPerformancePage] = useState(0);
  const [performanceRowsPerPage, setPerformanceRowsPerPage] = useState(10);

  const [satisfactionPage, setSatisfactionPage] = useState(0);
  const [satisfactionRowsPerPage, setSatisfactionRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  // Main data fetcher
  const fetchReportData = useCallback(async () => {
    setLoading(true);
    const params = {
      fromDate,
      toDate,
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
  }, [fromDate, toDate]);

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

  // Pagination Handlers
  const handleChangeFinancialPage = (_event: unknown, newPage: number) => {
    setFinancialPage(newPage);
  };
  const handleChangeFinancialRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinancialRowsPerPage(parseInt(event.target.value, 10));
    setFinancialPage(0);
  };

  const handleChangePerformancePage = (_event: unknown, newPage: number) => {
    setPerformancePage(newPage);
  };
  const handleChangePerformanceRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerformanceRowsPerPage(parseInt(event.target.value, 10));
    setPerformancePage(0);
  };

  const handleChangeSatisfactionPage = (_event: unknown, newPage: number) => {
    setSatisfactionPage(newPage);
  };
  const handleChangeSatisfactionRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSatisfactionRowsPerPage(parseInt(event.target.value, 10));
    setSatisfactionPage(0);
  };

  return {
    t,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    tabValue,
    handleTabChange,
    loading,
    financialData,
    performanceData,
    satisfactionData,
    handleExportExcel,
    financialMetrics,
    financialPage,
    financialRowsPerPage,
    handleChangeFinancialPage,
    handleChangeFinancialRowsPerPage,
    performancePage,
    performanceRowsPerPage,
    handleChangePerformancePage,
    handleChangePerformanceRowsPerPage,
    satisfactionPage,
    satisfactionRowsPerPage,
    handleChangeSatisfactionPage,
    handleChangeSatisfactionRowsPerPage,
  };
};
