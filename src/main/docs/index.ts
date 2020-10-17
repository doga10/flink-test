import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Flink - Teste Back-End',
    description: 'Essa é a documentação da API feita por Douglas Dennys em NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Douglas Dennys',
      email: 'douglasdennys45@gmail.com',
      url: 'https://www.linkedin.com/in/douglas-dennys-381629119/'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Artigo',
    description: 'APIs relacionadas a Artigo'
  }],
  paths,
  schemas,
  components
}
