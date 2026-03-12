export interface DoctorPatientRouteParams extends Record<
  string,
  string | undefined
> {
  doctorId: string;
  patientId: string;
}

export interface DoctorListItem {
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
}
