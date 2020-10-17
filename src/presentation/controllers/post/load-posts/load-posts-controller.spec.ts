import { LoadPostsController } from './load-posts-controller'
import { HttpRequest } from './load-posts-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadPostsSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ accountId: faker.random.number() })

type SutTypes = {
  sut: LoadPostsController
  loadPostsSpy: LoadPostsSpy
}

const makeSut = (): SutTypes => {
  const loadPostsSpy = new LoadPostsSpy()
  const sut = new LoadPostsController(loadPostsSpy)
  return {
    sut,
    loadPostsSpy
  }
}

describe('LoadPostsController', () => {
  test('Should call LoadPosts with correct value', async () => {
    const { sut, loadPostsSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadPostsSpy.accountId).toBe(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadPostsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPostsSpy.postModels))
  })

  test('Should return 204 if LoadPosts returns empty', async () => {
    const { sut, loadPostsSpy } = makeSut()
    loadPostsSpy.postModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadPosts throws', async () => {
    const { sut, loadPostsSpy } = makeSut()
    jest.spyOn(loadPostsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
