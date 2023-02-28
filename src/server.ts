import fastify from 'fastify'
import { appointmentsRoutes } from './routes/appointments.routes'

import './database/typeorm'

const app = fastify({ logger: false })

app.register(appointmentsRoutes, {
  prefix: 'appointments',
})

const start = async () => {
  try {
    await app.listen({ port: 8000, host: '0.0.0.0' })
    console.log('App running...')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
