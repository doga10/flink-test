import { DbLoadPosts } from './db-load-posts'
import { LoadPostsRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadPosts
  loadPostsRepositorySpy: LoadPostsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPostsRepositorySpy = new LoadPostsRepositorySpy()
  const sut = new DbLoadPosts(loadPostsRepositorySpy)
  return {
    sut,
    loadPostsRepositorySpy
  }
}

describe('DbLoadPosts', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadPostsRepositorySpy } = makeSut()
    const accountId = faker.random.number()
    await sut.load(accountId)
    expect(loadPostsRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadPostsRepositorySpy } = makeSut()
    const surveys = await sut.load(faker.random.number())
    expect(surveys).toEqual(loadPostsRepositorySpy.postModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadPostsRepositorySpy } = makeSut()
    jest.spyOn(loadPostsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.number())
    await expect(promise).rejects.toThrow()
  })
})
