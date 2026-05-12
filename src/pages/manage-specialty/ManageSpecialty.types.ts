export interface Specialty {
  id: number;
  specialtyName: string;
  description?: string;
}

export interface SpecialtyRequestPayload {
  specialtyName: string;
  description?: string;
}
