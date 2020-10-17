import { AddPostParams } from '@/domain/usecases/post/add-post'
import { PostModel } from '@/domain/models/post'
import faker from 'faker'

export const mockAddPostParams = (): AddPostParams => ({
  accountId: faker.random.number(),
  title: faker.name.title(),
  description: faker.lorem.word(),
  url: faker.internet.url()
})

export const mockPostModel = (): PostModel => ({
  id: faker.random.uuid(),
  accountId: faker.random.number(),
  title: faker.name.title(),
  description: faker.lorem.text(),
  url: faker.internet.url()
})

export const mockPostModels = (): PostModel[] => [
  mockPostModel(),
  mockPostModel()
]
