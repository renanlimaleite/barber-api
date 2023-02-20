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
}

export default Appointment
