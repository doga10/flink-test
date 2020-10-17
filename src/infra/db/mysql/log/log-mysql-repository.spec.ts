import { LogMySQLRepository } from './log-mysql-repository'
import { MySQLHelper } from '../helpers/mysql-helper'
import faker from 'faker'
import env from '@/main/config/env'

const makeSut = (): LogMySQLRepository => {
  return new LogMySQLRepository()
}

describe('LogMySQLRepository', () => {
  beforeAll(async () => {
    await MySQLHelper.connect({
      host: env.host,
      user: env.user,
      password: env.password,
      database: env.database
    })
  })

  beforeEach(async () => {
    await MySQLHelper.getTable('DELETE FROM errors', [])
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const [rows] = await MySQLHelper.getTable('SELECT COUNT(id) as count FROM errors', [])
    expect(rows[0].count).toBe(1)
  })
})
