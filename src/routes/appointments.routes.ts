import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentRepository = new AppointmentRepository()
const createAppointmentService = new CreateAppointmentService(
  appointmentRepository,
)

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    try {
      const createAppointmentBodySchema = z.object({
        provider: z.string(),
        date: z.string().datetime(),
      })

      const { provider, date } = createAppointmentBodySchema.parse(request.body)

      const parsedDate = parseISO(date)

      createAppointmentService.execute({
        provider,
        date: parsedDate,
      })

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ error: err.message })
      }
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  app.get('/', async (_, reply) => {
    const appointments = appointmentRepository.all()

    return reply.send(appointments)
  })
}
