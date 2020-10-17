import { DbAddPost } from './db-add-post'
import { AddPostRepositorySpy } from '@/data/test'
import { throwError, mockAddPostParams } from '@/domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddPost
  addPostRepositorySpy: AddPostRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPostRepositorySpy = new AddPostRepositorySpy()
  const sut = new DbAddPost(addPostRepositorySpy)
  return {
    sut,
    addPostRepositorySpy
  }
}

describe('DbAddPost Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddPostRepository with correct values', async () => {
    const { sut, addPostRepositorySpy } = makeSut()
    const postData = mockAddPostParams()
    await sut.add(postData)
    expect(addPostRepositorySpy.addPostParams).toEqual(postData)
  })

  test('Should throw if AddPostRepository throws', async () => {
    const { sut, addPostRepositorySpy } = makeSut()
    jest.spyOn(addPostRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPostParams())
    await expect(promise).rejects.toThrow()
  })
})
