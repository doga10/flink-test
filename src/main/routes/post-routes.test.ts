import app from '@/main/config/app'
import env from '@/main/config/env'
import { MySQLHelper } from '@/infra/db/mysql/helpers/mysql-helper'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { mockAddPostParams } from '@/domain/test'

const mockAccessToken = async (): Promise<any> => {
  await MySQLHelper.getTable('INSERT INTO accounts (name, email, password) VALUES (?, ?, ?)', ['Douglas', 'douglasdennys45@gmail.com', 'asd'])
  const [rows] = await await MySQLHelper.getTable('SELECT * FROM accounts WHERE email = ?', ['douglasdennys45@gmail.com'])
  const accessToken = sign({ id: rows[0].id }, env.jwtSecret)
  await MySQLHelper.getTable('UPDATE accounts SET accessToken = ? WHERE id = ?', [accessToken, rows[0].id])

  return { accessToken, id: rows[0].id }
}

describe('Post Routes', () => {
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
    await MySQLHelper.getTable('DELETE FROM posts', [])
  })

  describe('POST /posts', () => {
    test('Should return 403 on add post without accessToken', async () => {
      const params = mockAddPostParams()
      await request(app)
        .post('/api/posts')
        .send(params)
        .expect(403)
    })

    test('Should return 204 on add post with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      const params = mockAddPostParams()
      await request(app)
        .post('/api/posts')
        .set('x-access-token', accessToken)
        .send(params)
        .expect(204)
    })
  })

  describe('GET /posts', () => {
    test('Should return 403 on load posts without accessToken', async () => {
      await request(app)
        .get('/api/posts')
        .expect(403)
    })

    test('Should return 204 on load posts with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/posts')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
