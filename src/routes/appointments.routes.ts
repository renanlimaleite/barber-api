import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

const appointments = []

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createAppointmentBodySchema = z.object({
      provider: z.string(),
      date: z.string().datetime(),
    })

    const { provider, date } = createAppointmentBodySchema.parse(request.body)

    const appointment = {
      id: randomUUID(),
      provider,
      date,
    }

    appointments.push(appointment)

    return reply.status(201).send()
  })
}
