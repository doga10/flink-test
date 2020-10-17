import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  postsSchema,
  postSchema,
  signUpParamsSchema,
  addPostParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addPostParams: addPostParamsSchema,
  error: errorSchema,
  posts: postsSchema,
  post: postSchema
}
