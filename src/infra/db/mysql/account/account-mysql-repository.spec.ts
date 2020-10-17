import { AccountMySQLRepository } from './account-mysql-repository'
import { MySQLHelper } from '../helpers/mysql-helper'
import { mockAddAccountParams } from '@/domain/test'
import faker from 'faker'
import env from '@/main/config/env'

describe('AccountMySQLRepository', () => {
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
  })

  const makeSut = (): AccountMySQLRepository => {
    return new AccountMySQLRepository()
  }

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const account = await sut.add(addAccountParams)
      expect(account).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const res = await sut.add(addAccountParams)
      expect(res.accessToken).toBeFalsy()
      const fakeAccount = await sut.loadByEmail(addAccountParams.email)
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount.id, accessToken)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await sut.add({ name, email, password })
      const fakeAccount = await sut.loadByEmail(email)
      await sut.updateAccessToken(fakeAccount.id, accessToken)

      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeFalsy()
    })
  })
})
