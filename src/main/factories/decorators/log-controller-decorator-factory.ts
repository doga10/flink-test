import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMySQLRepository } from '@/infra/db/mysql/log/log-mysql-repository'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMySQLRepository = new LogMySQLRepository()
  return new LogControllerDecorator(controller, logMySQLRepository)
}
