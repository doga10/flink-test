import { AddPostParams } from '@/domain/usecases/post/add-post'

export interface AddPostRepository {
  add: (data: AddPostParams) => Promise<void>
}
