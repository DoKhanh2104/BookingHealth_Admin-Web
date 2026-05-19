import apiClient from '../api/apiClient';
import type {
  FinancialReportRow,
  PerformanceReportRow,
  SatisfactionReportRow,
} from '../pages/manage-report/ManageReport.types';

export interface ReportQueryParams {
  fromDate?: string;
  toDate?: string;
  specialtyId?: string | number;
  clinicId?: string | number;
}

export const reportService = {
  // Get detailed transactions for financial audit
  getFinancialReport: async (params: ReportQueryParams): Promise<FinancialReportRow[]> => {
    const response = await apiClient.get('/admin/reports/financial', { params });
    if (response.data && response.data.result) {
      return response.data.result as FinancialReportRow[];
    }
    return [];
  },

  // Get operational performance by Doctor or Specialty
  getPerformanceReport: async (params: ReportQueryParams): Promise<PerformanceReportRow[]> => {
    const response = await apiClient.get('/admin/reports/performance', { params });
    if (response.data && response.data.result) {
      return response.data.result as PerformanceReportRow[];
    }
    return [];
  },

  // Get doctor quality satisfaction reports
  getSatisfactionReport: async (params: ReportQueryParams): Promise<SatisfactionReportRow[]> => {
    const response = await apiClient.get('/admin/reports/satisfaction', { params });
    if (response.data && response.data.result) {
      return response.data.result as SatisfactionReportRow[];
    }
    return [];
  },

  // Trigger Excel export from Apache POI backend
  exportRevenueExcel: async (params: ReportQueryParams): Promise<Blob> => {
    const response = await apiClient.get('/admin/reports/revenue/excel', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
