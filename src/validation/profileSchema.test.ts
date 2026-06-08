import { describe, expect, it } from 'vitest';
import { createProfileSchema } from './profileSchema';

const validProfile = {
  name: 'Anna',
  age: '24',
  email: 'anna@example.com',
  gender: 'female',
  terms: true,
  image: 'data:image/png;base64,aW1hZ2U=',
  password: 'Password1!',
  confirmPassword: 'Password1!',
  country: 'Canada',
};

describe('profileSchema', () => {
  it('parses valid profile data and coerces age to number', () => {
    const result = createProfileSchema({ countries: ['Canada'] }).safeParse(validProfile);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.age).toBe(24);
    }
  });

  it('rejects invalid profile data', () => {
    const result = createProfileSchema({ countries: ['Canada'] }).safeParse({
      ...validProfile,
      name: 'anna',
      age: '-1',
      email: 'anna@example',
      confirmPassword: 'Different1!',
      country: 'Atlantis',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Name must start with an uppercase letter.');
      expect(messages).toContain('Age cannot be negative.');
      expect(messages).toContain('Email must contain one @ and a domain with a dot.');
      expect(messages).toContain('Passwords must match.');
      expect(messages).toContain('Choose a country from the list.');
    }
  });
});
