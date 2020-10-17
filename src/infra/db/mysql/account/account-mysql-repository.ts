import { MySQLHelper } from '../helpers/mysql-helper'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class AccountMySQLRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (data: AddAccountParams): Promise<AccountModel> {
    const text = 'INSERT INTO accounts(name, email, password) VALUES (?, ?, ?)'
    const values = [data.name, data.email, data.password]

    const [rows] = await MySQLHelper.getTable(text, values)
    return rows
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const text = 'SELECT * FROM accounts WHERE email = ?'
    const values = [email]

    const [rows] = await MySQLHelper.getTable(text, values)
    return rows[0]
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const text = 'UPDATE accounts SET accessToken = ? WHERE id = ?'
    const values = [token, id]

    await MySQLHelper.getTable(text, values)
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const text = 'SELECT * FROM accounts WHERE accessToken = ?'
    const values = [token]

    const [rows] = await MySQLHelper.getTable(text, values)
    return rows[0]
  }
}
