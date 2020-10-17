import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddPostController } from '@/main/factories/controllers/post/add-post/add-post-controller-factory'
import { makeLoadPostsController } from '@/main/factories/controllers/post/load-posts/load-posts-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/posts', auth, adaptRoute(makeAddPostController()))
  router.get('/posts', auth, adaptRoute(makeLoadPostsController()))
}
