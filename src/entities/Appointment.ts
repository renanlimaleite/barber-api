export interface CreateAppointmentDTO {
  provider: string
  date: Date
}

export interface Appointment extends CreateAppointmentDTO {
  id: string
}
