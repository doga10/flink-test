export const addPostParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  required: ['title', 'url', 'description']
}
