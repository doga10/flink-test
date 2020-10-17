import { PostMySQLRepository } from './post-mysql-repository'
import { MySQLHelper } from '../helpers/mysql-helper'
import { mockAddPostParams, mockAddAccountParams } from '@/domain/test'
import env from '@/main/config/env'

const makeSut = (): PostMySQLRepository => {
  return new PostMySQLRepository()
}

describe('PostMySQLRepository', () => {
  beforeAll(async () => {
    await MySQLHelper.connect({
      host: env.host,
      user: env.user,
      password: env.password,
      database: env.database
    })
  })

  beforeEach(async () => {
    await MySQLHelper.getTable('DELETE FROM accounts', [])
    await MySQLHelper.getTable('DELETE FROM posts', [])
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const account = mockAddAccountParams()
      const params = mockAddPostParams()
      await MySQLHelper.getTable('INSERT INTO accounts(name, email, password) VALUES (?, ?, ?)', [account.name, account.email, account.password])
      const fakeAccount = await MySQLHelper.getTable('SELECT * FROM accounts WHERE email = ?', [account.email])
      const sut = makeSut()
      await sut.add({ ...params, accountId: fakeAccount[0][0].id })
      const [rows] = await MySQLHelper.getTable('SELECT COUNT(id) AS count FROM posts WHERE accountId = ?', [fakeAccount[0][0].id])
      expect(rows[0].count).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const account = mockAddAccountParams()
      const sut = makeSut()
      await MySQLHelper.getTable('INSERT INTO accounts(name, email, password) VALUES (?, ?, ?)', [account.name, account.email, account.password])
      const fakeAccount = await MySQLHelper.getTable('SELECT * FROM accounts WHERE email = ?', [account.email])
      const addSurveyModels = mockAddPostParams()
      await sut.add({ ...addSurveyModels, accountId: fakeAccount[0][0].id })
      const result = await sut.loadAll(fakeAccount[0][0].id)
      expect(result).toBeTruthy()
    })
  })
})
