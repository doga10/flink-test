import { Controller, HttpRequest, HttpResponse, Validation, AddPost } from './add-post-controller-protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class AddPostController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPost: AddPost
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.body, accountId: httpRequest.accountId })
      if (error) {
        return badRequest(error)
      }
      await this.addPost.add({ ...httpRequest.body, accountId: httpRequest.accountId })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
