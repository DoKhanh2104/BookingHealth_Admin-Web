export interface Notification {
  id: number;
  title: string;
  content: string;
  type: number;
  createdAt: string;
  status: number;
  userId: number | null;
  userName: string;
  userEmail: string;
}

export interface CreateNotificationPayload {
  title: string;
  content: string;
  type: number;
  target: string;
}
