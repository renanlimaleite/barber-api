import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { startOfHour, parseISO, isEqual } from 'date-fns'
import Appointment from '../entities/Appointment'

const appointments: Appointment[] = []

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createAppointmentBodySchema = z.object({
      provider: z.string(),
      date: z.string().datetime(),
    })

    const { provider, date } = createAppointmentBodySchema.parse(request.body)

    const parsedDate = startOfHour(parseISO(date))
    const findAppointmentInSameDate = appointments.find((appointment) =>
      isEqual(parsedDate, appointment.date),
    )

    if (findAppointmentInSameDate) {
      return reply
        .status(401)
        .send({ error: 'This appointment is already booked' })
    }

    const appointment = new Appointment(provider, parsedDate)

    appointments.push(appointment)

    return reply.status(201).send()
  })
}
