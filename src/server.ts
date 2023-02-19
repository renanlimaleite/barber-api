import fastify from 'fastify'
import { appointmentsRoutes } from './routes/appointments.routes'

const app = fastify({ logger: false })

app.register(appointmentsRoutes, {
  prefix: 'appointments',
})

const start = async () => {
  try {
    await app.listen({ port: 4444 })
    console.log('App running...')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
