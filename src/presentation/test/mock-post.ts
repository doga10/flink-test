import { AddPostParams, AddPost } from '@/domain/usecases/post/add-post'
import { LoadPosts } from '@/domain/usecases/post/load-posts'
import { PostModel } from '@/domain/models/post'
import { mockPostModels } from '@/domain/test'

export class AddPostSpy implements AddPost {
  addPostParams: AddPostParams

  async add (data: AddPostParams): Promise<void> {
    this.addPostParams = data
  }
}

export class LoadPostsSpy implements LoadPosts {
  postModels = mockPostModels()
  accountId: number

  async load (accountId: number): Promise<PostModel[]> {
    this.accountId = accountId
    return this.postModels
  }
}
