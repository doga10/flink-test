import { AddPost } from '@/domain/usecases/post/add-post'
import { PostMySQLRepository } from '@/infra/db/mysql/post/post-mysql-repository'
import { DbAddPost } from '@/data/usecases/post/add-post/db-add-post'

export const makeDbAddPost = (): AddPost => {
  const postMongoRepository = new PostMySQLRepository()
  return new DbAddPost(postMongoRepository)
}
