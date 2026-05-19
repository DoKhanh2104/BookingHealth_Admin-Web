export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'SYSTEM' | 'PROMOTION' | 'MAINTENANCE';
  target: 'ALL' | 'DOCTOR' | 'PATIENT';
  status: 'SENT' | 'DRAFT';
  createdAt: string;
}

export interface CreateNotificationPayload {
  title: string;
  content: string;
  type: 'SYSTEM' | 'PROMOTION' | 'MAINTENANCE';
  target: 'ALL' | 'DOCTOR' | 'PATIENT';
  status: 'SENT' | 'DRAFT';
}
