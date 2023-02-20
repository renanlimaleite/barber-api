import { startOfHour } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'

interface IRequestDTO {
  provider: string
  date: Date
}

/**
 * Dependecy Inversion
 *
 * Sempre que o service tiver um dependência externa,
 * como exemplo: appointmentRepository, ao invés de instânciar esse repositorio,
 * ou dependência externa, vamos receber como parâmetro da classe
 *
 */

class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: IRequestDTO) {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
