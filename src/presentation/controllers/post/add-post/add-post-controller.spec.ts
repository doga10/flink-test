import { HttpRequest } from '@/presentation/protocols'
import { AddPostController } from './add-post-controller'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { ValidationSpy, AddPostSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    title: faker.name.title(),
    description: faker.lorem.text(),
    url: faker.internet.url()
  },
  accountId: faker.random.number()
})

type SutTypes = {
  sut: AddPostController
  validationSpy: ValidationSpy
  addPostSpy: AddPostSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPostSpy = new AddPostSpy()
  const sut = new AddPostController(validationSpy, addPostSpy)
  return {
    sut,
    validationSpy,
    addPostSpy
  }
}

describe('AddPostController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual({ ...httpRequest.body, accountId: httpRequest.accountId })
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddPost with correct values', async () => {
    const { sut, addPostSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addPostSpy.addPostParams).toEqual({ ...httpRequest.body, accountId: httpRequest.accountId })
  })

  test('Should return 500 if AddPost throws', async () => {
    const { sut, addPostSpy } = makeSut()
    jest.spyOn(addPostSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
