export const postSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    url: {
      type: 'string'
    }
  },
  required: ['id', 'title', 'description', 'url']
}
