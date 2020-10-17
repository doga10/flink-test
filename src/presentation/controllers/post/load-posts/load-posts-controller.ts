import { Controller, HttpRequest, HttpResponse, LoadPosts } from './load-posts-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadPostsController implements Controller {
  constructor (private readonly loadPosts: LoadPosts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadPosts.load(httpRequest.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
