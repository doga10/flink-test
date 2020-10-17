import { AddPostRepository } from '@/data/protocols/db/post/add-post-repository'
import { LoadPostsRepository } from '@/data/protocols/db/post/load-posts-repository'
import { AddPostParams } from '@/domain/usecases/post/add-post'
import { PostModel } from '@/domain/models/post'
import { mockPostModels } from '@/domain/test'

export class AddPostRepositorySpy implements AddPostRepository {
  addPostParams: AddPostParams

  async add (data: AddPostParams): Promise<void> {
    this.addPostParams = data
  }
}

export class LoadPostsRepositorySpy implements LoadPostsRepository {
  postModels = mockPostModels()
  accountId: number

  async loadAll (accountId: number): Promise<PostModel[]> {
    this.accountId = accountId
    return this.postModels
  }
}
