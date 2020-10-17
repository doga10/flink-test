import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { AccountMySQLRepository } from '@/infra/db/mysql/account/account-mysql-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMySQLRepository = new AccountMySQLRepository()
  return new DbAddAccount(bcryptAdapter, accountMySQLRepository, accountMySQLRepository)
}
