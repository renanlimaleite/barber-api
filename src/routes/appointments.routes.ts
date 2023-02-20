import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import Appointment from '../entities/Appointment'

const appointmentRepository = new AppointmentRepository()

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createAppointmentBodySchema = z.object({
      provider: z.string(),
      date: z.string().datetime(),
    })

    const { provider, date } = createAppointmentBodySchema.parse(request.body)

    const parsedDate = startOfHour(parseISO(date))

    const appointments = appointmentRepository.getAppointments()

    const findAppointmentInSameDate = Appointment.findByDate(
      appointments,
      parsedDate,
    )

    if (findAppointmentInSameDate) {
      return reply
        .status(401)
        .send({ error: 'This appointment is already booked' })
    }

    appointmentRepository.create(provider, parsedDate)

    return reply.status(201).send()
  })
}
