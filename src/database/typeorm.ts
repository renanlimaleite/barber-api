import { DataSource } from 'typeorm'

import { join } from 'path'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'barber_api',
  migrations: [join(__dirname, './migrations/*.ts')],
})

async function bootstrapDatabase() {
  try {
    AppDataSource.initialize()
    console.log('DB is running...')
  } catch (e) {
    console.error(e)
  }
}

bootstrapDatabase()
