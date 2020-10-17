import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddPostValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'accountId', 'description', 'url']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
