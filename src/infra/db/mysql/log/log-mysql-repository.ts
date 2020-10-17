import { MySQLHelper } from '../helpers/mysql-helper'
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export class LogMySQLRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const text = 'INSERT INTO errors(stack, date) VALUES (?, ?)'
    const values = [stack, new Date()]
    await MySQLHelper.getTable(text, values)
  }
}
