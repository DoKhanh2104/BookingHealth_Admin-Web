export interface Clinic {
  id: number;
  clinicName: string;
  address: string;
  longitude?: number;
  latitude?: number;
  soLuongBacSi?: number;
}

export interface ClinicRequestPayload {
  name: string;
  address: string;
  longitude?: number;
  latitude?: number;
}
