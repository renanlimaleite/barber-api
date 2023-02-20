import Appointment from '../entities/Appointment'

class AppointmentRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  getAppointments() {
    return this.appointments
  }

  create(provider: string, date: Date) {
    const appointment = new Appointment(provider, date)

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentRepository
