import { makeAddPostValidation } from './add-post-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddPostValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPostValidation()
    const validations: Validation[] = []
    for (const field of ['title', 'accountId', 'description', 'url']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
