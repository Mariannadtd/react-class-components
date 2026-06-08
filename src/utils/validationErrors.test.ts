import { describe, expect, it } from 'vitest';
import { createProfileSchema } from '../validation/profileSchema';
import { collectZodErrors } from './validationErrors';

describe('collectZodErrors', () => {
  it('maps zod issues to the first message for each form field', () => {
    const schema = createProfileSchema({ countries: ['Canada'] });
    const result = schema.safeParse({
      name: '',
      age: '',
      email: 'wrong',
      gender: '',
      terms: false,
      image: '',
      password: 'abc',
      confirmPassword: 'def',
      country: 'Atlantis',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(collectZodErrors(result.error.issues)).toMatchObject({
        name: 'Name is required.',
        age: 'Age must be a number.',
        email: 'Email must contain one @ and a domain with a dot.',
        gender: 'Please select a gender.',
        terms: 'You must accept Terms and Conditions.',
        image: 'Image is required.',
        country: 'Choose a country from the list.',
      });
    }
  });
});
