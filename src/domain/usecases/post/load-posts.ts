import { PostModel } from '@/domain/models/post'

export interface LoadPosts {
  load: (accountId: number) => Promise<PostModel[]>
}
