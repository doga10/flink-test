import { MySQLHelper } from '../helpers/mysql-helper'
import { AddPostParams } from '@/domain/usecases/post/add-post'
import { PostModel } from '@/domain/models/post'
import { AddPostRepository } from '@/data/protocols/db/post/add-post-repository'
import { LoadPostsRepository } from '@/data/protocols/db/post/load-posts-repository'

export class PostMySQLRepository implements AddPostRepository, LoadPostsRepository {
  async add (data: AddPostParams): Promise<void> {
    const text = 'INSERT INTO posts(accountId, title, description, url) VALUES (?, ?, ?, ?)'
    const values = [data.accountId, data.title, data.description, data.url]
    await MySQLHelper.getTable(text, values)
  }

  async loadAll (accountId: number): Promise<PostModel[]> {
    const text = 'SELECT * FROM posts WHERE accountId = ?'
    const values = [accountId]

    const [rows] = await MySQLHelper.getTable(text, values)
    return rows
  }
}
