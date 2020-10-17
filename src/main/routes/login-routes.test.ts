import app from '@/main/config/app'
import { MySQLHelper } from '@/infra/db/mysql/helpers/mysql-helper'
import request from 'supertest'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MySQLHelper.connect({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    })
  })

  beforeEach(async () => {
    await MySQLHelper.getTable('DELETE FROM accounts', [])
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Douglas Dennys',
          email: 'douglasdennys45@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Douglas Dennys',
          email: 'douglasdennys45@gmail.com',
          password: '123'
        })
        .expect(200)

      await request(app)
        .post('/api/login')
        .send({
          email: 'douglasdennys45@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'douglasdennys45@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
