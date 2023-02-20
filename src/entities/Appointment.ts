import { isEqual } from 'date-fns'
import { randomUUID } from 'node:crypto'

class Appointment {
  id: string

  constructor(public provider: string, public date: Date) {
    this.id = randomUUID()
    this.provider = provider
    this.date = date
  }

  static findByDate(appointments: Appointment[], date: Date) {
    return appointments.find((appointment) => isEqual(date, appointment.date))
  }
}

export default Appointment
