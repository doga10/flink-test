import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadPosts } from '@/main/factories/usecases/post/load-posts/db-load-posts-factory'
import { Controller } from '@/presentation/protocols'
import { LoadPostsController } from '@/presentation/controllers/post/load-posts/load-posts-controller'

export const makeLoadPostsController = (): Controller => {
  const controller = new LoadPostsController(makeDbLoadPosts())
  return makeLogControllerDecorator(controller)
}
