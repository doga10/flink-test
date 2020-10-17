import 'module-alias/register'
import env from './config/env'
import { MySQLHelper } from '@/infra/db/mysql/helpers/mysql-helper'

MySQLHelper.connect({
  host: env.host,
  user: env.user,
  password: env.password,
  database: env.database
}).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
})
  .catch(console.error)
