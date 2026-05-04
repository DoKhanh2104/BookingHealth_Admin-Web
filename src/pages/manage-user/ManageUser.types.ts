export type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  avatar: string;
  status: number | string;
  roles: {
    roleName: string;
    roleDescription: string | null;
  }[];
  role?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password?: string;
  avatar?: string | null;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: number | string;
  avatar?: string | null;
}
