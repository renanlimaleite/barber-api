import { randomUUID } from 'node:crypto'

class Appointment {
  id: string

  constructor(public provider: string, public date: Date) {
    this.id = randomUUID()
    this.provider = provider
    this.date = date
  }
}

export default Appointment
