import { makeAddPostValidation } from './add-post-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddPost } from '@/main/factories/usecases/post/add-post/db-add-post-factory'
import { Controller } from '@/presentation/protocols'
import { AddPostController } from '@/presentation/controllers/post/add-post/add-post-controller'

export const makeAddPostController = (): Controller => {
  const controller = new AddPostController(makeAddPostValidation(), makeDbAddPost())
  return makeLogControllerDecorator(controller)
}
