import { z } from 'zod';
import { isBasicEmailValid } from '../utils/formUtils';

const genders = ['female', 'male', 'other'] as const;

type CreateProfileSchemaOptions = {
  countries: string[];
};

export const createProfileSchema = ({ countries }: CreateProfileSchemaOptions) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(1, 'Name is required.')
        .refine((name) => name[0] === name[0]?.toUpperCase(), {
          message: 'Name must start with an uppercase letter.',
        }),

      age: z.preprocess(
        (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
        z.coerce
          .number({
            error: 'Age must be a number.',
          })
          .int('Age must be a whole number.')
          .min(0, 'Age cannot be negative.'),
      ),

      email: z
        .string()
        .trim()
        .min(1, 'Email is required.')
        .refine(isBasicEmailValid, 'Email must contain one @ and a domain with a dot.'),

      gender: z.enum(genders, {
        error: 'Please select a gender.',
      }),

      terms: z.boolean().refine((accepted) => accepted, {
        message: 'You must accept Terms and Conditions.',
      }),

      image: z.string().min(1, 'Image is required.'),

      password: z.string().min(1, 'Password is required.'),

      confirmPassword: z.string().min(1, 'Please confirm your password.'),

      country: z
        .string()
        .trim()
        .min(1, 'Country is required.')
        .refine((country) => countries.includes(country), 'Choose a country from the list.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords must match.',
    });

type ProfileSchema = ReturnType<typeof createProfileSchema>;

export type ProfileSchemaData = z.output<ProfileSchema>;
export type ProfileSchemaInput = z.input<ProfileSchema>;
