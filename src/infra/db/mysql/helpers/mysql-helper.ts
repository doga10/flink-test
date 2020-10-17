import mysql from 'mysql2/promise'

export const MySQLHelper = {
  conn: null as any,
  uri: null as any,

  async connect (uri: any): Promise<void> {
    this.uri = uri
    this.conn = await mysql.createConnection({
      host: uri.host,
      user: uri.user,
      password: uri.password,
      database: uri.database
    })
  },

  async getTable (text: string, values: any): Promise<any> {
    if (!this.conn) {
      this.connect(this.uri)
    }
    const result = await this.conn.execute(text, values)
    return result
  }
}
