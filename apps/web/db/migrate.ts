import { createClient } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'

import 'dotenv/config'

async function runMigrate() {
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    throw new Error('POSTGRES_URL_NON_POOLING is not defined')
  }
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING as string,
  })
  await client.connect()
  const db = drizzle(client)

  console.log('Running migrations...')

  try {
    const start = Date.now()
    await migrate(db, { migrationsFolder: './db/migrations' })
    const end = Date.now()
    console.log(`✅ Migrations completed in ${end - start}ms`)
  } catch (error) {
    console.error('❌ Migration failed')
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

runMigrate()
