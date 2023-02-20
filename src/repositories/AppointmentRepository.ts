import { isEqual } from 'date-fns'
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

  findByDate(date: Date) {
    return this.appointments.find((appointment) =>
      isEqual(date, appointment.date),
    )
  }
}

export default AppointmentRepository
