import { PostModel } from '@/domain/models/post'

export interface LoadPostsRepository {
  loadAll: (accountId: number) => Promise<PostModel[]>
}
