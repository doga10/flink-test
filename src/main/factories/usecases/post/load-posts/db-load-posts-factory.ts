import { PostMySQLRepository } from '@/infra/db/mysql/post/post-mysql-repository'
import { LoadPosts } from '@/domain/usecases/post/load-posts'
import { DbLoadPosts } from '@/data/usecases/post/load-posts/db-load-posts'

export const makeDbLoadPosts = (): LoadPosts => {
  const postMySQLRepository = new PostMySQLRepository()
  return new DbLoadPosts(postMySQLRepository)
}
