import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { AccountMySQLRepository } from '@/infra/db/mysql/account/account-mysql-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMySQLRepository = new AccountMySQLRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMySQLRepository)
}
