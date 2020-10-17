import { LoadPostsRepository, LoadPosts, PostModel } from './db-load-posts-protocols'

export class DbLoadPosts implements LoadPosts {
  constructor (private readonly loadPostsRepository: LoadPostsRepository) {}

  async load (accountId: number): Promise<PostModel[]> {
    const surveys = await this.loadPostsRepository.loadAll(accountId)
    return surveys
  }
}
