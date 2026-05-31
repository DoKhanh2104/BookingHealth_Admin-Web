import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { doctorService } from '../../services/doctorService';
import { useTranslation } from '../../libs/i18n.hooks';
import {
  dashboardService,
  type RevenueFilter,
  type DashboardSummary,
  type RevenueChartData,
  type BookingStatusItem,
  type SpecialtyDistributionItem,
  type TopDoctorItem,
  type RecentFeedbackItem,
  type PendingDoctorItem,
} from '../../services/dashboardService';
import type { Theme } from '@mui/material';

// ─────────────────────────────────────────────
// Fallback defaults (tránh crash khi data chưa về)
// ─────────────────────────────────────────────

const DEFAULT_SUMMARY: DashboardSummary = {
  totalBookings: 0,
  newDoctors: 0,
  newUsers: 0,
  totalRevenue: 0,
};

const DEFAULT_REVENUE: RevenueChartData = { labels: [], data: [] };
const DEFAULT_BOOKING_STATUS: BookingStatusItem = { pending: 0, completed: 0, cancelled: 0 };

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export const useDashboardHooks = () => {
  const tDashboard = useTranslation('Dashboard');

  // ── Filters ──────────────────────────────────────────────────────────
  const [revenueFilter, setRevenueFilter] = useState<RevenueFilter>('week');

  // ── Loading / Error ───────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Data states ───────────────────────────────────────────────────────
  const [summary, setSummary] = useState<DashboardSummary>(DEFAULT_SUMMARY);
  const [revenueData, setRevenueData] = useState<RevenueChartData>(DEFAULT_REVENUE);
  const [bookingStatus, setBookingStatus] = useState<BookingStatusItem>(DEFAULT_BOOKING_STATUS);
  const [specialtyData, setSpecialtyData] = useState<SpecialtyDistributionItem[]>([]);
  const [topDoctors, setTopDoctors] = useState<TopDoctorItem[]>([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState<RecentFeedbackItem[]>([]);
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctorItem[]>([]);

  const fetchMainData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, bookingStatusRes, specialtyRes, topDoctorsRes] = await Promise.all([
        dashboardService.getSummary('month'),
        dashboardService.getBookingStatus('month'),
        dashboardService.getSpecialtyDistribution('month'),
        dashboardService.getTopDoctors('month'),
      ]);
      setSummary(summaryRes ?? DEFAULT_SUMMARY);
      setBookingStatus(bookingStatusRes ?? DEFAULT_BOOKING_STATUS);
      setSpecialtyData(Array.isArray(specialtyRes) ? specialtyRes : []);
      setTopDoctors(Array.isArray(topDoctorsRes) ? topDoctorsRes : []);
    } catch (err) {
      console.error('[Dashboard] fetchMainData error:', err);
      setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────
  // Fetch dữ liệu tĩnh (feedbacks, pendingDoctors) — chỉ load một lần
  // ─────────────────────────────────────────────────────────────────────
  const fetchStaticData = useCallback(async () => {
    try {
      const [feedbacksRes, pendingRes] = await Promise.all([
        dashboardService.getRecentFeedbacks(),
        dashboardService.getPendingDoctors(),
      ]);
      setRecentFeedbacks(Array.isArray(feedbacksRes) ? feedbacksRes : []);
      setPendingDoctors(Array.isArray(pendingRes) ? pendingRes : []);
    } catch (err) {
      console.error('[Dashboard] fetchStaticData error:', err);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────
  // Fetch doanh thu — phụ thuộc revenueFilter
  // ─────────────────────────────────────────────────────────────────────
  const fetchRevenueData = useCallback(async (filter: RevenueFilter) => {
    try {
      const res = await dashboardService.getRevenueChart(filter);
      setRevenueData(res ?? DEFAULT_REVENUE);
    } catch (err) {
      console.error('[Dashboard] fetchRevenueData error:', err);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => fetchMainData());
  }, [fetchMainData]);

  useEffect(() => {
    Promise.resolve().then(() => fetchRevenueData(revenueFilter));
  }, [revenueFilter, fetchRevenueData]);

  useEffect(() => {
    Promise.resolve().then(() => fetchStaticData());
  }, [fetchStaticData]);

  /** Dữ liệu pie chart booking status — nhận theme để lấy màu */
  const bookingStatusData = (theme: Theme) => [
    {
      id: 0,
      value: bookingStatus.pending,
      label: tDashboard('bookingStatus.pending'),
      color: theme.palette.warning.main,
    },
    {
      id: 1,
      value: bookingStatus.completed,
      label: tDashboard('bookingStatus.completed'),
      color: theme.palette.success.main,
    },
    {
      id: 2,
      value: bookingStatus.cancelled,
      label: tDashboard('bookingStatus.cancelled'),
      color: theme.palette.error.main,
    },
  ];

  const isPendingActionEmpty = pendingDoctors.length === 0;

  const handleApprovePendingDoctor = async (id: number) => {
    try {
      await doctorService.approve(id);
      toast.success('Duyệt bác sĩ thành công');
      fetchStaticData();
      fetchMainData();
    } catch (error) {
      console.error('Lỗi duyệt bác sĩ:', error);
      toast.error('Lỗi khi duyệt bác sĩ');
    }
  };

  const handleRejectPendingDoctor = async (id: number) => {
    try {
      await doctorService.reject(id);
      toast.success('Từ chối bác sĩ thành công');
      fetchStaticData();
      fetchMainData();
    } catch (error) {
      console.error('Lỗi từ chối bác sĩ:', error);
      toast.error('Lỗi khi từ chối bác sĩ');
    }
  };

  return {
    // translations
    tDashboard,

    // filters
    revenueFilter,
    setRevenueFilter,

    // loading / error
    loading,
    error,

    // summary stats
    summary,

    // chart data
    revenueData,
    bookingStatusData,
    specialtyData,

    // list data
    topDoctors,
    recentFeedbacks,
    pendingDoctors,
    isPendingActionEmpty,
    handleApprovePendingDoctor,
    handleRejectPendingDoctor,
  };
};
