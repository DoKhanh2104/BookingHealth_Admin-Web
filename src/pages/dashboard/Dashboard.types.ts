import { useDashboardHooks } from './Dashboard.hooks';

export type DashboardHooksType = ReturnType<typeof useDashboardHooks>;

// Re-export types từ service để các component dùng thống nhất
export type { PendingDoctorItem as PendingDoctor } from '../../services/dashboardService';
export type { TopDoctorItem as TopDoctor } from '../../services/dashboardService';
export type { RecentFeedbackItem as RecentFeedback } from '../../services/dashboardService';
