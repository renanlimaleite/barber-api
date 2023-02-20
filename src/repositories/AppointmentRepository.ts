import Appointment from '../entities/Appointment'

interface ICreateAppointmentDTO {
  provider: string
  date: Date
}

class AppointmentRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  all() {
    return this.appointments
  }

  create({ provider, date }: ICreateAppointmentDTO) {
    const appointment = new Appointment({
      provider,
      date,
    })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentRepository
