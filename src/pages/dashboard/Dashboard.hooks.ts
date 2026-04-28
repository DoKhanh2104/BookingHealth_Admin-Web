import { useState } from 'react';
import { useTranslation } from '../../libs/i18n.hooks';

export const useDashboardHooks = () => {
  const tDashboard = useTranslation('Dashboard');

  const [revenueFilter, setRevenueFilter] = useState<'week' | 'month' | 'year'>('week');

  const getRevenueData = () => {
    switch (revenueFilter) {
      case 'week':
        return {
          labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
          data: [1200000, 2500000, 1800000, 3200000, 2900000, 4500000, 3800000],
        };
      case 'month':
        return {
          labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
          data: [15000000, 22000000, 18000000, 28000000],
        };
      case 'year':
        return {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          data: [
            50000000, 48000000, 60000000, 75000000, 80000000, 95000000, 110000000, 105000000,
            120000000, 140000000, 135000000, 150000000,
          ],
        };
    }
  };

  const revenueData = getRevenueData();

  const topDoctors = [
    { name: 'BS. Nguyễn Văn A', spec: 'Tim mạch', rating: 4.9, bookings: 342, avatar: 'A' },
    { name: 'BS. Trần Thị B', spec: 'Nhi khoa', rating: 4.8, bookings: 289, avatar: 'B' },
    { name: 'BS. Lê C', spec: 'Nội tổng quát', rating: 4.7, bookings: 215, avatar: 'C' },
    { name: 'BS. Phạm D', spec: 'Da liễu', rating: 4.5, bookings: 198, avatar: 'D' },
    { name: 'BS. Hoàng E', spec: 'Tai Mũi Họng', rating: 4.5, bookings: 156, avatar: 'E' },
  ];

  const specialtyData = [
    { category: 'Nhi khoa', value: 140 },
    { category: 'Nội tổng quát', value: 200 },
    { category: 'Da liễu', value: 85 },
    { category: 'Tim mạch', value: 65 },
  ];

  const bookingStatusData = (theme: import('@mui/material').Theme) => [
    {
      id: 0,
      value: 45,
      label: tDashboard('bookingStatus.pending'),
      color: theme.palette.warning.main,
    },
    {
      id: 1,
      value: 120,
      label: tDashboard('bookingStatus.completed'),
      color: theme.palette.success.main,
    },
    {
      id: 2,
      value: 15,
      label: tDashboard('bookingStatus.cancelled'),
      color: theme.palette.error.main,
    },
  ];

  const pendingDoctors = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn A',
      spec: 'Tim mạch',
      date: '28/04/2026',
      certStatus: tDashboard('status.uploaded'),
    },
    {
      id: 2,
      name: 'BS. Trần Thị B',
      spec: 'Nhi khoa',
      date: '27/04/2026',
      certStatus: tDashboard('status.uploaded'),
    },
  ];

  const recentFeedbacks = [
    {
      id: 1,
      patientName: 'Lê Văn Khách',
      doctorName: 'BS. Nguyễn Văn A',
      rating: 1,
      comment: 'Bác sĩ khám qua loa, thái độ không tốt.',
      date: '10 phút trước',
    },
    {
      id: 2,
      patientName: 'Trần Thị Bệnh',
      doctorName: 'BS. Phạm D',
      rating: 2,
      comment: 'Đợi quá lâu dù đã đặt lịch trước.',
      date: '1 giờ trước',
    },
  ];

  const isPendingActionEmpty = false;

  return {
    tDashboard,
    revenueFilter,
    setRevenueFilter,
    revenueData,
    topDoctors,
    specialtyData,
    bookingStatusData,
    pendingDoctors,
    recentFeedbacks,
    isPendingActionEmpty,
  };
};
