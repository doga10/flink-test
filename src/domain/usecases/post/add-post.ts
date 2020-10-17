import { PostModel } from '@/domain/models/post'

export type AddPostParams = Omit<PostModel, 'id'>

export interface AddPost {
  add: (post: AddPostParams) => Promise<void>
}
