import { isEqual } from 'date-fns'
import { randomUUID } from 'node:crypto'

class Appointment {
  id: string

  provider: string

  date: Date

  constructor({ date, provider }: Omit<Appointment, 'id'>) {
    this.id = randomUUID()
    this.provider = provider
    this.date = date
  }

  static findAppointmentInSameDate(appointments: Appointment[], date: Date) {
    return appointments.find((appointment) => isEqual(date, appointment.date))
  }
}

export default Appointment
