import { AddPost, AddPostParams, AddPostRepository } from './db-add-post-protocols'

export class DbAddPost implements AddPost {
  constructor (private readonly addPostRepository: AddPostRepository) {}

  async add (data: AddPostParams): Promise<void> {
    await this.addPostRepository.add(data)
  }
}
